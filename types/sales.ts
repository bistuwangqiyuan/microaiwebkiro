export type LeadLevel = 'A' | 'B' | 'C';
export type LeadStatus = 'new' | 'qualified' | 'nurturing' | 'converted' | 'closed_lost';
export type OpportunityStage = 'new' | 'discovery' | 'proposal' | 'pilot' | 'negotiation' | 'won' | 'lost';
export type SourceType = 'form' | 'ai_chat' | 'manual' | 'wechat' | 'phone' | 'email';
export type TaskStatus = 'pending' | 'done' | 'cancelled';
export type ProductSlug = 'wecalc-b' | 'wecalc-p' | 'wecalc-e';

export interface LeadRaw {
  id: string;
  source_type: SourceType;
  source_page: string | null;
  visitor_id: string | null;
  conversation_id: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  name: string | null;
  phone: string | null;
  wechat: string | null;
  email: string | null;
  company_name: string | null;
  industry: string | null;
  city: string | null;
  position: string | null;
  inquiry_type: string | null;
  needs_data_local: boolean;
  accepts_leasing: boolean;
  budget_range: string | null;
  launch_timeline: string | null;
  scenario: string | null;
  message: string | null;
  ai_summary: string | null;
  recommended_product: string | null;
  recommended_case_path: string | null;
  lead_score: number;
  lead_level: LeadLevel;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
}

export interface Opportunity {
  id: string;
  lead_id: string | null;
  account_id: string | null;
  contact_id: string | null;
  opportunity_type: string;
  recommended_product: string | null;
  stage: OpportunityStage;
  estimated_value: number | null;
  win_probability: number;
  owner_type: string;
  owner_name: string | null;
  next_action: string | null;
  next_action_at: string | null;
  last_activity_at: string | null;
  loss_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface PartnerLead {
  id: string;
  name: string;
  phone: string | null;
  wechat: string | null;
  email: string | null;
  city: string | null;
  industry_resources: string | null;
  has_team: boolean;
  expected_customer_count: number;
  experience: string | null;
  message: string | null;
  ai_summary: string | null;
  ai_score: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CashflowPriorityResult {
  cashflowScore: number;
  cashflowPriority: 'urgent' | 'high' | 'medium' | 'low';
  recommendedPath: CashflowStrategy;
  reasons: string[];
}

export type CashflowStrategy =
  | 'B_LEASING_PUSH'
  | 'B_SALE_PUSH'
  | 'B_POC_PUSH'
  | 'B_SERVICE_PACKAGE_PUSH'
  | 'PARTNER_STARTER_PUSH'
  | 'ALT_CASHFLOW_PUSH';

export const CASHFLOW_STRATEGY_LABELS: Record<CashflowStrategy, string> = {
  B_LEASING_PUSH: '微算-B 融资租赁',
  B_SALE_PUSH: '微算-B 直接销售',
  B_POC_PUSH: '微算-B 付费试点/POC',
  B_SERVICE_PACKAGE_PUSH: '微算-B + 服务包',
  PARTNER_STARTER_PUSH: '合伙人 starter package',
  ALT_CASHFLOW_PUSH: '替代正现金流路径',
};

export const CASHFLOW_STRATEGY_PRIORITY: CashflowStrategy[] = [
  'B_LEASING_PUSH',
  'B_SALE_PUSH',
  'B_POC_PUSH',
  'B_SERVICE_PACKAGE_PUSH',
  'PARTNER_STARTER_PUSH',
  'ALT_CASHFLOW_PUSH',
];
