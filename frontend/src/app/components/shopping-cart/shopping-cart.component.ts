import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ShopStore } from '../../state/shop.store';
import {OverlayModule} from '@angular/cdk/overlay';
import { ConnectedPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [OverlayModule, CurrencyPipe, NgOptimizedImage],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent {
  private readonly _shopStore = inject(ShopStore);

  cartItems = this._shopStore.cartItems;
  totalPrice = this._shopStore.totalPrice;
  isOpen = false;

  positions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    }
  ];

  toggleCart() {
    this.isOpen = !this.isOpen;
  }

  removeItem(gameId: string) {
    this._shopStore.removeFromCart(gameId);
  }

  clearCart() {
    this._shopStore.clearCart();
    this.isOpen = false;
  }
}
