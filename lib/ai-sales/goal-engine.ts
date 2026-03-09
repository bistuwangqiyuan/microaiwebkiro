import { getSqlClient } from '@/lib/db';
import type { ObjectiveType } from '@/types/gm';

export async function createBusinessObjective(params: {
  runId: string;
  objectiveType: ObjectiveType;
  priority: number;
  objectiveTitle: string;
  objectiveDetail?: string;
  targetMetric?: string;
  targetValue?: number;
}): Promise<string | null> {
  const sql = getSqlClient();
  if (!sql) return null;

  try {
    const rows = await sql<{ id: string }>`
      insert into business_objectives (
        run_id, objective_type, priority, objective_title,
        objective_detail, target_metric, target_value, current_value,
        status, created_by
      ) values (
        ${params.runId},
        ${params.objectiveType},
        ${params.priority},
        ${params.objectiveTitle},
        ${params.objectiveDetail ?? null},
        ${params.targetMetric ?? null},
        ${params.targetValue ?? null},
        ${0},
        ${'active'},
        ${'general_manager_agent'}
      )
      returning id
    `;
    return rows[0]?.id ?? null;
  } catch (error) {
    console.error('[GoalEngine] createBusinessObjective failed:', error);
    return null;
  }
}

export async function getActiveObjectives(runId?: string) {
  const sql = getSqlClient();
  if (!sql) return [];

  try {
    if (runId) {
      return await sql`
        select * from business_objectives
        where run_id = ${runId} and status = 'active'
        order by priority asc
      `;
    }
    return await sql`
      select * from business_objectives
      where status = 'active'
      order by created_at desc, priority asc
      limit 10
    `;
  } catch {
    return [];
  }
}

export async function updateObjectiveStatus(
  objectiveId: string,
  status: 'achieved' | 'missed' | 'switched',
  currentValue?: number
): Promise<void> {
  const sql = getSqlClient();
  if (!sql) return;

  try {
    await sql`
      update business_objectives
      set status = ${status},
          current_value = coalesce(${currentValue ?? null}, current_value),
          updated_at = now()
      where id = ${objectiveId}
    `;
  } catch (error) {
    console.error('[GoalEngine] updateObjectiveStatus failed:', error);
  }
}

export async function getRecentObjectives(limit = 10) {
  const sql = getSqlClient();
  if (!sql) return [];

  try {
    return await sql`
      select bo.*, ar.status as run_status
      from business_objectives bo
      left join agent_runs ar on ar.id = bo.run_id
      order by bo.created_at desc
      limit ${limit}
    `;
  } catch {
    return [];
  }
}
