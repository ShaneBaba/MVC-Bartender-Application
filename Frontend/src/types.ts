export type Cocktail = {
  id: number;
  name: string;
  ingredients: string | string[];
  price: number;
};

export type Order = {
  id: number;
  patronName: string;
  cocktailId: number;
  cocktailName: string;
  status: 'placed' | 'ready_for_pickup';
  createdAt: string;
  readyAt?: string;
};
