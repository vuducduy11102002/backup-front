export type PredictionValue = number | string | boolean;

export class Predict {
  id?: string;
  patientName?: string;
  data?: string;
  columns?: string;
  predictions?: Record<string, PredictionValue>;
  csvPath?: string;
  out_come?: number[];
  createdAt?: string;
}
export interface CsvFile {
  name: string;
  path: string;
  mtime: string;
}
