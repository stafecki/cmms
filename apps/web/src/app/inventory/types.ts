export interface Category {
  id: string;
  name: string;
}

export interface Part {
  id: string;
  name: string;
  stockQuantity: number;
  reorderPoint: number;
  unitPrice: number;
  category: Category;
}

export interface ToolLoan {
  id: string;
  loanedAt: string;
  part: { name: string };
  user: { name: string };
}

export interface NewPart {
  name: string;
  categoryId: string;
  qrCode: string;
  stockQuantity: number;
  reorderPoint: number;
  unitPrice: number;
}