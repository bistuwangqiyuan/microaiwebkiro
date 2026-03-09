export type AgentRunStatus = 'queued' | 'running' | 'success' | 'partial_failed' | 'failed';
export type AgentTaskStatus = 'queued' | 'running' | 'success' | 'failed' | 'skipped';
export type AgentExecutor = 'native_llm' | 'openclaw';
export type OutboundChannel = 'email' | 'wechat' | 'feishu' | 'sms' | 'webhook';
export type TriggerType = 'scheduled' | 'immediate' | 'manual';

export type AgentName =
  | 'general_manager_agent'
  | 'lead_intake_agent'
  | 'lead_nurture_agent'
  | 'partner_review_agent'
  | 'proposal_agent'
  | 'cashflow_agent'
  | 'ops_report_agent'
  | 'page_strategy_agent';

export interface AgentRun {
  id: string;
  trigger_type: TriggerType;
  scheduled_at: string | null;
  started_at: string;
  finished_at: string | null;
  status: AgentRunStatus;
  summary: Record<string, unknown>;
  error_message: string | null;
  created_at: string;
}

export interface AgentTask {
  id: string;
  run_id: string;
  agent_name: AgentName;
  executor: AgentExecutor;
  status: AgentTaskStatus;
  input_payload: Record<string, unknown>;
  output_payload: Record<string, unknown>;
  retry_count: number;
  started_at: string | null;
  finished_at: string | null;
  error_message: string | null;
  created_at: string;
}

export interface AgentTaskTemplate {
  agent_name: AgentName;
  executor: AgentExecutor;
  input_payload: Record<string, unknown>;
  description: string;
}

export interface SchedulerLock {
  lock_key: string;
  owner_id: string;
  expires_at: string;
}

export interface OutboundJob {
  id: string;
  run_id: string | null;
  lead_id: string | null;
  opportunity_id: string | null;
  channel: OutboundChannel;
  target_address: string | null;
  template_key: string | null;
  content_payload: Record<string, unknown>;
  status: AgentTaskStatus;
  scheduled_at: string | null;
  sent_at: string | null;
  error_message: string | null;
  created_at: string;
}

export interface OpenClawSession {
  id: string;
  task_id: string;
  target_system: string;
  instruction: string;
  session_payload: Record<string, unknown>;
  status: AgentTaskStatus;
  screenshot_url: string | null;
  video_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface OpenClawTaskInput {
  runId: string;
  taskName: string;
  targetSystem: string;
  instruction: string;
  payload: Record<string, unknown>;
}

export interface AgentRunResult {
  runId: string;
  status: AgentRunStatus;
  tasksCreated: number;
  tasksSucceeded: number;
  tasksFailed: number;
  openclawFallbackCount: number;
  summary: Record<string, unknown>;
}
