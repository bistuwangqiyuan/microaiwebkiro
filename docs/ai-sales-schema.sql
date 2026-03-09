create extension if not exists pgcrypto;

create type lead_level as enum ('A', 'B', 'C');
create type lead_status as enum ('new', 'qualified', 'nurturing', 'converted', 'closed_lost');
create type opportunity_stage as enum ('new', 'discovery', 'proposal', 'pilot', 'negotiation', 'won', 'lost');
create type source_type as enum ('form', 'ai_chat', 'manual', 'wechat', 'phone', 'email');
create type task_status as enum ('pending', 'done', 'cancelled');

create table if not exists lead_raw (
  id uuid primary key default gen_random_uuid(),
  source_type source_type not null,
  source_page text,
  visitor_id text,
  conversation_id text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  name text,
  phone text,
  wechat text,
  email text,
  company_name text,
  industry text,
  city text,
  position text,
  inquiry_type text,
  needs_data_local boolean default false,
  accepts_leasing boolean default false,
  budget_range text,
  launch_timeline text,
  scenario text,
  message text,
  ai_summary text,
  recommended_product text,
  recommended_case_path text,
  lead_score integer default 0,
  lead_level lead_level default 'C',
  status lead_status default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_lead_raw_created_at on lead_raw(created_at desc);
create index if not exists idx_lead_raw_level on lead_raw(lead_level, status);
create index if not exists idx_lead_raw_source_page on lead_raw(source_page);
create index if not exists idx_lead_raw_industry on lead_raw(industry);

create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  industry text,
  city text,
  size_range text,
  website text,
  notes text,
  created_at timestamptz not null default now()
);

create unique index if not exists idx_accounts_company_name on accounts(company_name);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references accounts(id) on delete set null,
  name text,
  phone text,
  wechat text,
  email text,
  position text,
  is_primary boolean default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_contacts_account_id on contacts(account_id);
create index if not exists idx_contacts_phone on contacts(phone);

create table if not exists opportunities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references lead_raw(id) on delete set null,
  account_id uuid references accounts(id) on delete set null,
  contact_id uuid references contacts(id) on delete set null,
  opportunity_type text not null,
  recommended_product text,
  stage opportunity_stage not null default 'new',
  estimated_value numeric(14, 2),
  win_probability integer default 0,
  owner_type text default 'ai',
  owner_name text,
  next_action text,
  next_action_at timestamptz,
  last_activity_at timestamptz,
  loss_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_opportunities_stage on opportunities(stage);
create index if not exists idx_opportunities_next_action_at on opportunities(next_action_at);
create index if not exists idx_opportunities_lead_id on opportunities(lead_id);

create table if not exists partner_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  wechat text,
  email text,
  city text,
  industry_resources text,
  has_team boolean default false,
  expected_customer_count integer default 0,
  experience text,
  message text,
  ai_summary text,
  ai_score integer default 0,
  status text default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_partner_leads_status on partner_leads(status);
create index if not exists idx_partner_leads_score on partner_leads(ai_score desc);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete cascade,
  activity_type text not null,
  summary text,
  content text,
  created_by text default 'ai',
  created_at timestamptz not null default now()
);

create index if not exists idx_activities_opportunity_id on activities(opportunity_id);
create index if not exists idx_activities_created_at on activities(created_at desc);

create table if not exists followup_tasks (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete cascade,
  task_type text not null,
  status task_status not null default 'pending',
  due_at timestamptz,
  assigned_to text default 'ai',
  payload jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_followup_tasks_due_at on followup_tasks(due_at);
create index if not exists idx_followup_tasks_status on followup_tasks(status);

create table if not exists page_events (
  id uuid primary key default gen_random_uuid(),
  visitor_id text,
  path text not null,
  event_name text not null,
  event_payload jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_page_events_path on page_events(path);
create index if not exists idx_page_events_event_name on page_events(event_name);
create index if not exists idx_page_events_created_at on page_events(created_at desc);

create or replace view dashboard_lead_summary as
select
  date_trunc('day', created_at) as day,
  count(*) as total_leads,
  count(*) filter (where lead_level = 'A') as a_leads,
  count(*) filter (where lead_level = 'B') as b_leads,
  count(*) filter (where lead_level = 'C') as c_leads
from lead_raw
group by 1
order by 1 desc;
