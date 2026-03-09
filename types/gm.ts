import type { CashflowStrategy } from './sales';

export type ObjectiveType =
  | 'B_SALE'
  | 'B_LEASING'
  | 'B_POC'
  | 'B_SERVICE_PACKAGE'
  | 'PARTNER_STARTER_PACKAGE'
  | 'ALT_CASHFLOW';

export type ObjectiveStatus = 'active' | 'achieved' | 'missed' | 'switched';

export interface BusinessObjective {
  id: string;
  run_id: string;
  objective_type: ObjectiveType;
  priority: number;
  objective_title: string;
  objective_detail: string | null;
  target_metric: string | null;
  target_value: number | null;
  current_value: number | null;
  status: ObjectiveStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface GmDecision {
  id: string;
  run_id: string;
  primary_goal: string;
  chosen_strategy: CashflowStrategy;
  why: string[];
  expected_cash_in: number;
  actual_cash_in: number;
  expected_sign_count: number;
  actual_sign_count: number;
  next_plan: string | null;
  created_at: string;
}

export interface CashflowSnapshot {
  id: string;
  snapshot_at: string;
  inflow_amount: number;
  outflow_amount: number;
  net_cashflow: number;
  b_sales_count: number;
  b_rental_count: number;
  b_poc_count: number;
  notes: Record<string, unknown>;
}

export interface GmOperatingContext {
  recentLeads: Array<{
    id: string;
    lead_level: string;
    industry: string | null;
    accepts_leasing: boolean;
    budget_range: string | null;
    launch_timeline: string | null;
    recommended_product: string | null;
    created_at: string;
  }>;
  recentPartnerLeads: Array<{
    id: string;
    city: string | null;
    ai_score: number;
    has_team: boolean;
    status: string;
  }>;
  openOpportunities: Array<{
    id: string;
    stage: string;
    recommended_product: string | null;
    estimated_value: number | null;
    next_action: string | null;
  }>;
  recentPageEvents: Array<{
    path: string;
    event_name: string;
    count: number;
  }>;
  latestCashflow: CashflowSnapshot | null;
  recentDecisions: GmDecision[];
  consecutiveFailures: number;
}

export interface GmDecisionOutput {
  primaryGoal: string;
  chosenStrategy: CashflowStrategy;
  expectedCashIn: number;
  expectedSignCount: number;
  why: string[];
  nextPlan: string;
  objectiveType: ObjectiveType;
  targetMetric: string;
  targetValue: number;
}
