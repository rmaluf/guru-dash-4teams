export interface IJenkinsMetadata {
  url: string;
  job: string;
  branch: string;
}

export interface IJenkinsProjectResponse {
  paging: {
    pageIndex: number;
    pageSize: number;
    total: number;
  };
  components: IJenkinsProject[]
}

interface IJenkinsProject {
  id: string;
  organization: string;
  key: string;
  name: string;
  qualifier: string;
  project: string;
}

export interface IJenkinsMetricResponse {
  metrics: IJenkinsMetric[];
  total: number;
  p: number;
  ps: number;
}

interface IJenkinsMetric {
  id: string;
  key: string;
  type: string;
  name: string;
  description: string;
  domain: string;
  directon: number;
  qualitative: boolean;
  hidden: boolean;
  custom: boolean;
}

export interface IJenkinsMeasureResponse {
  measure: IJenkinsMeasure
}

export interface IJenkinsMeasure {
  metric: string;
  history: IJenkinsMeasureHistory[];
}

interface IJenkinsMeasureHistory {
  measurement: string;
  date: string;
  value: string;
}