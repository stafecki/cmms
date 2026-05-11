export interface ChecklistItem {
  step: number;
  label: string;
  done: boolean;
}

export interface PreventivePlan {
  id: string;
  machineId: string;
  name: string;
  intervalHours?: number | null;
  intervalDays?: number | null;
  advanceDays: number;
  checklist: ChecklistItem[];
  isActive: boolean;
  lastRunAt?: string | null;
  nextRunAt?: string | null;
  createdAt: string;
  machine?: {
    id: string;
    name: string;
    serialNumber: string;
  };
}