export type NotificationType =
  | 'CRITICAL_FAILURE'
  | 'REORDER_ALERT'
  | 'PREVENTIVE_DUE'
  | 'CERT_EXPIRING'
  | 'WORK_ORDER_ASSIGNED'
  | 'ANNOUNCEMENT';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}