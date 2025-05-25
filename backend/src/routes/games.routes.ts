import express from 'express';
import { games } from '../data/games.data';
import { Game } from '../models/game.model';

const router = express.Router();

// Get all games
router.get('/', (_req, res) => {
  const filteredGames = games.filter(game => !game.isGameOfTheWeek);
  res.json(filteredGames);
});

// Get  game of the week
router.get('/game-of-the-week', (_req, res) => {
  const gameOfTheWeek = getGameOfTheWeek();
  if (!gameOfTheWeek) {
    res.status(404).json({ message: 'No game of the week found' });
  } else {
    res.json(gameOfTheWeek);
  }
});

const getGameOfTheWeek = (): Game | null => {
  const gamesOfTheWeek = games.filter(g => g.isGameOfTheWeek);
  if (gamesOfTheWeek.length === 0) {
    return null;
  }
  
  // If there are multiple games of the week, select one at random
  const randomIndex = Math.floor(Math.random() * gamesOfTheWeek.length);
  return gamesOfTheWeek[randomIndex];
};

export default router;
