import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GameCard } from '../models/game-card';
import { Game } from '../schemas/game.schema';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = 'http://localhost:3000/api';

  fetchGames(userId: string): Observable<GameCard[]> {
    return this._httpClient.get<Game[]>(`${this._apiUrl}/games`, {
      params: { userId }
    })
    .pipe(
      map(games => games.map(game => this.mapToGameCard(game)))
    );
  }

  fetchGameOfTheWeek(): Observable<GameCard | null> {
    return this._httpClient.get<Game>(`${this._apiUrl}/games/game-of-the-week`)
      .pipe(
        map(game => this.mapToGameCard(game)),
      );
  }

  private mapToGameCard(backendGame: Game): GameCard {
    return {
      ...backendGame,
      title: backendGame.name,
      imageUrl: backendGame.imgPath,
      inShoppingCart: false,
    };
  }
}
