import { Game } from '../models/game.model';

export const games: Game[] = [
  {
    id: '1',
    name: 'oddworld: stranger’s',
    imgPath: '/assets/images/oddworld.jpg',
    price: 9.99,
    isGameOfTheWeek: false,
    discount: 50,
    owned: false
  },
  {
    id: '2',
    name: 'chaos on deponia',
    imgPath: '/assets/images/chaos.jpg',
    price: 39.99,
    isGameOfTheWeek: false,
    discount: 50,
    owned: true
  },
  {
    id: '3',
    name: 'The settlers 2: gold edition',
    imgPath: '/assets/images/settlers2.jpg',
    price: 5.99,
    isGameOfTheWeek: false,
    discount: 0,
    owned: false
  },
  {
    id: '4',
    name: 'neverwinter nights',
    imgPath: '/assets/images/neverwinter.jpg',
    price: 9.99,
    isGameOfTheWeek: false,
    discount: 50,
    owned: false
  },
  {
    id: '5',
    name: 'assassin’s creed:  director’s cut',
    imgPath: '/assets/images/assassin.jpg',
    price: 9.99,
    isGameOfTheWeek: false,
    discount: 10,
    owned: false
  },
   {
    id: '6',
    name: 'Witcher',
    imgPath: '/assets/images/big-witcher.png',
    price: 9.99,
    isGameOfTheWeek: true,
    discount: 50,
    owned: false
  }
];
