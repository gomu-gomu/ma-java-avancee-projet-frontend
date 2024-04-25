export type TBestClass = {
  grade: string
  sector: string
  className: string
  successRate: number
};

export type TBestClassUI = {
  label: string
  value: number
};

export type TBestClassesResponse = {
  latestCycleYear: number
  topClasses: Array<TBestClassUI>
};