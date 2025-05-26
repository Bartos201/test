import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ShopStore } from '../../state/shop.store';
import { NgOptimizedImage } from '@angular/common';
import { GameCardComponent } from '../../components/game-card/game-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgOptimizedImage, GameCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly _shopStore = inject(ShopStore);

  gameOfTheWeek = this._shopStore.gameOfTheWeek;
  games = this._shopStore.entities;

  constructor() {
    this._shopStore.fetchGameOfTheWeek();
    //Here should be a real game ID, 'dsd' is just a placeholder
    this._shopStore.fetchGames('dsd');
  }

  onSecretButtonClick() {
    console.log('Secret button clicked!');
  }
}
