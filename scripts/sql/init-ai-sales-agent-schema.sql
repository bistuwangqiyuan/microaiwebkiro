-- Agent system tables (extends the base sales schema in docs/ai-sales-schema.sql)

create type if not exists agent_run_status as enum ('queued', 'running', 'success', 'partial_failed', 'failed');
create type if not exists agent_task_status as enum ('queued', 'running', 'success', 'failed', 'skipped');
create type if not exists agent_executor as enum ('native_llm', 'openclaw');
create type if not exists outbound_channel as enum ('email', 'wechat', 'feishu', 'sms', 'webhook');

create table if not exists agent_runs (
  id uuid primary key default gen_random_uuid(),
  trigger_type text not null,
  scheduled_at timestamptz,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status agent_run_status not null default 'queued',
  summary jsonb default '{}'::jsonb,
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists idx_agent_runs_started_at on agent_runs(started_at desc);
create index if not exists idx_agent_runs_status on agent_runs(status);

create table if not exists agent_tasks (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references agent_runs(id) on delete cascade,
  agent_name text not null,
  executor agent_executor not null default 'native_llm',
  status agent_task_status not null default 'queued',
  input_payload jsonb default '{}'::jsonb,
  output_payload jsonb default '{}'::jsonb,
  retry_count integer default 0,
  started_at timestamptz,
  finished_at timestamptz,
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists idx_agent_tasks_run_id on agent_tasks(run_id);
create index if not exists idx_agent_tasks_status on agent_tasks(status);
create index if not exists idx_agent_tasks_executor on agent_tasks(executor);

create table if not exists scheduler_locks (
  lock_key text primary key,
  owner_id text,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists outbound_jobs (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references agent_runs(id) on delete set null,
  lead_id uuid references lead_raw(id) on delete set null,
  opportunity_id uuid references opportunities(id) on delete set null,
  channel outbound_channel not null,
  target_address text,
  template_key text,
  content_payload jsonb default '{}'::jsonb,
  status agent_task_status not null default 'queued',
  scheduled_at timestamptz,
  sent_at timestamptz,
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists idx_outbound_jobs_status on outbound_jobs(status);
create index if not exists idx_outbound_jobs_scheduled_at on outbound_jobs(scheduled_at);

create table if not exists agent_memory (
  id uuid primary key default gen_random_uuid(),
  namespace text not null,
  memory_key text not null,
  memory_value jsonb default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create unique index if not exists idx_agent_memory_namespace_key
  on agent_memory(namespace, memory_key);

create table if not exists openclaw_sessions (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references agent_tasks(id) on delete cascade,
  target_system text not null,
  instruction text not null,
  session_payload jsonb default '{}'::jsonb,
  status agent_task_status not null default 'queued',
  screenshot_url text,
  video_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_openclaw_sessions_task_id on openclaw_sessions(task_id);
create index if not exists idx_openclaw_sessions_status on openclaw_sessions(status);

create table if not exists business_objectives (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references agent_runs(id) on delete cascade,
  objective_type text not null,
  priority integer not null default 1,
  objective_title text not null,
  objective_detail text,
  target_metric text,
  target_value numeric(14,2),
  current_value numeric(14,2),
  status text default 'active',
  created_by text default 'general_manager_agent',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_business_objectives_run_id on business_objectives(run_id);
create index if not exists idx_business_objectives_status on business_objectives(status);

create table if not exists gm_decisions (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references agent_runs(id) on delete cascade,
  primary_goal text not null,
  chosen_strategy text not null,
  why jsonb default '[]'::jsonb,
  expected_cash_in numeric(14,2) default 0,
  actual_cash_in numeric(14,2) default 0,
  expected_sign_count integer default 0,
  actual_sign_count integer default 0,
  next_plan text,
  created_at timestamptz not null default now()
);

create index if not exists idx_gm_decisions_run_id on gm_decisions(run_id);
create index if not exists idx_gm_decisions_strategy on gm_decisions(chosen_strategy);

create table if not exists cashflow_snapshots (
  id uuid primary key default gen_random_uuid(),
  snapshot_at timestamptz not null default now(),
  inflow_amount numeric(14,2) default 0,
  outflow_amount numeric(14,2) default 0,
  net_cashflow numeric(14,2) generated always as (inflow_amount - outflow_amount) stored,
  b_sales_count integer default 0,
  b_rental_count integer default 0,
  b_poc_count integer default 0,
  notes jsonb default '{}'::jsonb
);

create index if not exists idx_cashflow_snapshots_snapshot_at on cashflow_snapshots(snapshot_at desc);
