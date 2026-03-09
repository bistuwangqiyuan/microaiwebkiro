import { getSqlClient } from '@/lib/db';
import type { OpenClawTaskInput } from '@/types/agent';
import { updateTaskStatus } from './agent-runner';

const MAX_RETRIES = 2;

export async function createOpenClawSession(input: OpenClawTaskInput): Promise<string | null> {
  const sql = getSqlClient();
  if (!sql) return null;

  try {
    const taskRows = await sql<{ id: string }>`
      insert into agent_tasks (
        run_id, agent_name, executor, status, input_payload
      ) values (
        ${input.runId},
        ${'openclaw_worker'},
        ${'openclaw'}::agent_executor,
        ${'queued'}::agent_task_status,
        ${JSON.stringify({
          taskName: input.taskName,
          targetSystem: input.targetSystem,
          instruction: input.instruction,
          payload: input.payload,
        })}::jsonb
      )
      returning id
    `;

    const taskId = taskRows[0]?.id;
    if (!taskId) return null;

    const sessionRows = await sql<{ id: string }>`
      insert into openclaw_sessions (
        task_id, target_system, instruction, session_payload, status
      ) values (
        ${taskId},
        ${input.targetSystem},
        ${input.instruction},
        ${JSON.stringify(input.payload)}::jsonb,
        ${'queued'}::agent_task_status
      )
      returning id
    `;

    return sessionRows[0]?.id ?? null;
  } catch (error) {
    console.error('[OpenClaw] createSession failed:', error);
    return null;
  }
}

export async function executeOpenClawTask(sessionId: string): Promise<{
  success: boolean;
  output?: Record<string, unknown>;
  error?: string;
}> {
  const sql = getSqlClient();
  if (!sql) return { success: false, error: 'Database not configured' };

  try {
    await sql`
      update openclaw_sessions
      set status = ${'running'}::agent_task_status, updated_at = now()
      where id = ${sessionId}
    `;

    const sessions = await sql<{
      task_id: string;
      target_system: string;
      instruction: string;
      session_payload: Record<string, unknown>;
    }>`
      select task_id, target_system, instruction, session_payload
      from openclaw_sessions
      where id = ${sessionId}
    `;

    const session = sessions[0];
    if (!session) return { success: false, error: 'Session not found' };

    await updateTaskStatus(session.task_id, 'running');

    const openclawApiUrl = process.env.OPENCLAW_API_URL;
    const openclawApiKey = process.env.OPENCLAW_API_KEY;

    if (!openclawApiUrl || !openclawApiKey) {
      const output = {
        status: 'simulated',
        message: 'OpenClaw not configured, task recorded for manual execution',
        instruction: session.instruction,
        targetSystem: session.target_system,
      };

      await sql`
        update openclaw_sessions
        set status = ${'success'}::agent_task_status,
            updated_at = now()
        where id = ${sessionId}
      `;
      await updateTaskStatus(session.task_id, 'success', output);

      return { success: true, output };
    }

    const response = await fetch(openclawApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openclawApiKey}`,
      },
      body: JSON.stringify({
        instruction: session.instruction,
        targetSystem: session.target_system,
        payload: session.session_payload,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenClaw API returned ${response.status}`);
    }

    const result = await response.json();

    await sql`
      update openclaw_sessions
      set status = ${'success'}::agent_task_status,
          screenshot_url = ${result.screenshotUrl ?? null},
          video_url = ${result.videoUrl ?? null},
          updated_at = now()
      where id = ${sessionId}
    `;

    await updateTaskStatus(session.task_id, 'success', result);

    return { success: true, output: result };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    await sql`
      update openclaw_sessions
      set status = ${'failed'}::agent_task_status,
          updated_at = now()
      where id = ${sessionId}
    `.catch(() => {});

    return { success: false, error: errorMessage };
  }
}

export async function retryOpenClawTask(sessionId: string): Promise<{
  success: boolean;
  retryCount: number;
  error?: string;
}> {
  const sql = getSqlClient();
  if (!sql) return { success: false, retryCount: 0, error: 'Database not configured' };

  try {
    const sessions = await sql<{ task_id: string }>`
      select task_id from openclaw_sessions where id = ${sessionId}
    `;
    const taskId = sessions[0]?.task_id;
    if (!taskId) return { success: false, retryCount: 0, error: 'Session not found' };

    const tasks = await sql<{ retry_count: number | string }>`
      select retry_count from agent_tasks where id = ${taskId}
    `;
    const currentRetries = Number(tasks[0]?.retry_count ?? 0);

    if (currentRetries >= MAX_RETRIES) {
      return {
        success: false,
        retryCount: currentRetries,
        error: `Max retries (${MAX_RETRIES}) exceeded`,
      };
    }

    await sql`
      update agent_tasks
      set retry_count = retry_count + 1, status = ${'queued'}::agent_task_status
      where id = ${taskId}
    `;

    const result = await executeOpenClawTask(sessionId);
    return {
      success: result.success,
      retryCount: currentRetries + 1,
      error: result.error,
    };
  } catch (error) {
    return {
      success: false,
      retryCount: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function getOpenClawSessions(runId?: string) {
  const sql = getSqlClient();
  if (!sql) return [];

  try {
    if (runId) {
      return await sql`
        select ocs.*, at2.agent_name, at2.retry_count
        from openclaw_sessions ocs
        join agent_tasks at2 on at2.id = ocs.task_id
        where at2.run_id = ${runId}
        order by ocs.created_at desc
      `;
    }
    return await sql`
      select ocs.*, at2.agent_name, at2.retry_count
      from openclaw_sessions ocs
      join agent_tasks at2 on at2.id = ocs.task_id
      order by ocs.created_at desc
      limit 50
    `;
  } catch {
    return [];
  }
}
