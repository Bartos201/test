export interface Game {
  id: string;
  name: string;
  imgPath: string;
  price: number;
  isGameOfTheWeek: boolean;
  discount: number; // percentage discount, 0 if no discount
  owned: boolean; // true if the user owns the game
}
