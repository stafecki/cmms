export interface StockLog {
  id: string;
  quantity: number;
  reason: string;
  createdAt: string;
  user: {
    name: string;
  };
}

export interface Category {
  id: string;
  name: string;
}
export interface Part {
  id: string;
  name: string;
  qrCode: string;
  stockQuantity: number;
  reorderPoint: number;
  unitPrice: number;
  category: Category;
  stockLogs?: StockLog[];
}

export interface ToolLoan {
  id: string;
  loanedAt: string;
  returnedAt?: string;
  part: Part;
  user: {
    id: string;
    name: string;
  };
  workOrder?: {
    id: string;
    title: string;
  };
}

export interface NewPart {
  name: string;
  categoryId: string;
  qrCode: string;
  stockQuantity: number;
  reorderPoint: number;
  unitPrice: number;
}