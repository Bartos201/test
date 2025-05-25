import express from 'express';
import cors from 'cors';
import gamesRoutes from './routes/games.routes';
import usersRoutes from './routes/users.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/games', gamesRoutes);
app.use('/api/users', usersRoutes);

// Default route
app.get('/', (_req, res) => {
  res.send('Game Store API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
