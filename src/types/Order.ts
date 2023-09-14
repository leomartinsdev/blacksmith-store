export type Order = {
  id: number;
  userId: number;
  productId?: { id: number }[] | number[];
};
