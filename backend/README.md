# Game Store Backend API

This is a Node.js/Express backend API for the Game Store application with a mock database for games and users.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

4. Run production server:
   ```
   npm start
   ```

## API Endpoints

### Games

- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get a specific game by ID
- `GET /api/games/featured/game-of-the-week` - Get games marked as game of the week
- `GET /api/games/featured/discounted` - Get games with active discounts

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user by ID
- `GET /api/users/:id/games` - Get games purchased by a specific user
- `POST /api/users/:id/purchase/:gameId` - Purchase a game for a user

## Data Models

### Game
```typescript
{
  id: string;
  name: string;
  imgPath: string;
  price: number;
  isGameOfTheWeek: boolean;
  discount: number; // percentage discount, 0 if no discount
}
```

### User
```typescript
{
  id: string;
  username: string;
  email: string;
  purchasedGames: string[]; // array of game IDs
}
```
