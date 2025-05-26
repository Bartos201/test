import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GameCard } from '../../models/game-card';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ShopStore } from '../../state/shop.store';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CurrencyPipe, NgOptimizedImage],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameCardComponent {
  private readonly _shopStore = inject(ShopStore);
  game = input.required<GameCard>();

  addToCart(): void {
    this._shopStore.addToCart(this.game().id);
  }
}
