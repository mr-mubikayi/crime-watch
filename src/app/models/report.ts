import { ReportStatus } from "./report-status";

export class Report {
  id: string;
  user: string;
  date: string;
  time: string;
  latitude: number;
  longitude: number;
  type: string;
  description?: string;
  status?: ReportStatus;
  severity?: number;
}
