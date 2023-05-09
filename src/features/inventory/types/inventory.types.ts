export interface IGetInventories {
  inventories: Inventory[];
  currentPage: number;
  totalPages: number;
  totalInventories: number;
}

export interface IInventories {
  rows: Inventory[];
  count: number;
}

export interface ICreateInventory {
  name: string;
  location: string;
  price: number;
}

export interface Inventory {
  id: number;
  name: string;
  price: number;
  location: string;
}
