export type ReportGranularity = "month" | "quarter" | "year";

export type ReportDateRange = {
  start: Date;
  end: Date;
};

export type ReportBusinessUnitSummary = {
  name: string;
  hours: number;
};

export type ReportUserSummary = {
  name: string;
  hours: number;
  completion: number;
  expectedHours: number;
};

export type ReportCompletionSummary = {
  expected: number;
  actual: number;
  completion: number;
};

export type ReportProjectCommentItem = {
  date: Date;
  comment: string;
  user: string;
};

export type ReportProjectComments = {
  project: string;
  asset: string;
  comments: ReportProjectCommentItem[];
};

export type ReportData = {
  businessUnits: ReportBusinessUnitSummary[];
  users: ReportUserSummary[];
  completion: ReportCompletionSummary;
  comments: ReportProjectComments[];
};

