export interface Game {
  id: string;
  name: string;
  imgPath: string;
  price: number;
  isGameOfTheWeek: boolean;
  discount: number;
  owned: boolean;
}
