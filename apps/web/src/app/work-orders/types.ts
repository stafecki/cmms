export enum WorkOrderStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_FOR_PARTS = 'WAITING_FOR_PARTS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Machine {
  id: string;
  name: string;
  serialNumber: string;
}

export interface WorkOrderPart {
  id: string;
  workOrderId: string;
  partId: string;
  quantity: number;
  part: {
    id: string;
    name: string;
    unitPrice: string | number;
  };
}

export interface WorkOrderMessage {
  id: string;
  workOrderId: string;
  userId: string;
  content: string;
  sentAt: string;
  user: User;
}

export interface WorkOrder {
  id: string;
  machineId: string;
  reportedById: string;
  assignedToId: string | null;
  status: WorkOrderStatus;
  priority: Priority;
  title: string;
  description: string;
  bhpConfirmed: boolean;
  laborCost: string | number;
  partsCost: string | number;
  createdAt: string;
  startedAt: string | null;
  closedAt: string | null;
  updatedAt: string;

  machine?: Machine;
  reportedBy?: User;
  assignedTo?: User;
  messages?: WorkOrderMessage[];
  parts?: WorkOrderPart[];
}

export interface CreateWorkOrderInput {
  machineId: string;
  title: string;
  description: string;
  priority?: Priority;
}

export interface UpdateWorkOrderInput {
  title?: string;
  description?: string;
  priority?: Priority;
}
