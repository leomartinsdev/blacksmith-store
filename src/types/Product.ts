export type Product = {
  id: number;
  name: string;
  price: string;
  orderId?: number | null;
};

// Vou usar Omit para fazer um Utility type de produto que não precise do OrderId

export type ProductNoId = Omit<Product, 'orderId'>;
