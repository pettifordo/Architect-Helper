// LeanIX Fact Sheet Types

export interface FactSheet {
  id: string;
  displayName: string;
  description?: string;
  state?: string;
  type: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface Application extends FactSheet {
  type: 'Application';
  functionalSuitability?: 'unreasonable' | 'insufficient' | 'appropriate' | 'perfect';
  technicalSuitability?: 'inappropriate' | 'unreasonable' | 'adequate' | 'fullyAppropriate';
  businessCriticality?: 'administrativeService' | 'businessOperational' | 'businessCritical' | 'missionCritical';
  lxHostingType?: string;
  lxSixRClassification?: 'rehost' | 'retire' | 'rearchitect' | 'replatform' | 'retain' | 'repurchase';
}

export interface ITComponent extends FactSheet {
  type: 'ITComponent';
  description?: string;
}

export interface Platform extends FactSheet {
  type: 'Platform';
  description?: string;
}

export interface BusinessCapability extends FactSheet {
  type: 'BusinessCapability';
  description?: string;
}

export interface TechnicalStack extends FactSheet {
  type: 'TechnicalStack';
  description?: string;
}

export interface Interface extends FactSheet {
  type: 'Interface';
  description?: string;
}

export interface DataObject extends FactSheet {
  type: 'DataObject';
  description?: string;
}

// Response wrapper types
export interface LeanIXResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    extensions?: Record<string, any>;
  }>;
}

export interface FactSheetConnection<T extends FactSheet = FactSheet> {
  edges: Array<{
    node: T;
  }>;
  pageInfo: {
    hasNextPage: boolean;
    endCursor?: string;
  };
}

// Report configuration types
export type ChartType = 'table' | 'bar' | 'pie' | 'line' | 'scatter' | 'matrix';

export interface ReportConfig {
  id: string;
  name: string;
  description?: string;
  factSheetType: string;
  filters?: FilterConfig[];
  chartType: ChartType;
  xAxis?: string;
  yAxis?: string;
  groupBy?: string;
}

export interface FilterConfig {
  field: string;
  operator: 'equals' | 'contains' | 'gt' | 'lt' | 'gte' | 'lte' | 'in';
  value: any;
}

// Drill-down state
export interface DrilldownContext {
  path: Array<{
    label: string;
    field: string;
    value: any;
  }>;
  currentFactSheetId?: string;
  currentFactSheetType?: string;
}
