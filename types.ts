export interface Product {
  id: string | number;
  name: string;
  price: string | number;
  shippingList?: string;
  rentalPrice?: string | number;
  notes?: string;
  imageUrl?: string;
  // New fields
  parameters?: string;        // 产品参数
  leadTime?: string;          // 工期
  customerPrep?: string;      // 需自备
  caseReference?: string;     // 案例参考
  applicableOccasions?: string; // 适用场合
}

export interface SearchState {
  query: string;
  results: Product[];
  isOpen: boolean;
}