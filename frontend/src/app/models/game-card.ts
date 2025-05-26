export interface GameCard {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  discount: number;
  inShoppingCart: boolean;
  owned: boolean;
}
