export interface Book {
  id: string;
  title: string;
  description: string;
  status: BookStatus;
}

export enum BookStatus {
  AVAILABLE = 'AVAILABLE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}
