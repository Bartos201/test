import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { By } from '@angular/platform-browser';

import { ShoppingCartComponent } from './shopping-cart.component';
import { ShopStore } from '../../state/shop.store';
import { GameCard } from '../../models/game-card';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  const mockCartItems = signal<GameCard[]>([
    {
      id: '1',
      title: 'Game 1',
      price: 19.99,
      imageUrl: 'assets/images/game1.jpg',
      discount: 0,
      inShoppingCart: true,
      owned: false
    },
    {
      id: '2',
      title: 'Game 2',
      price: 29.99,
      imageUrl: 'assets/images/game2.jpg',
      discount: 0,
      inShoppingCart: true,
      owned: false
    }
  ]);

  const mockTotalPrice = computed(() => mockCartItems().reduce((total, item) => total + item.price, 0));

  const mockShopStore = {
    removeFromCart: jasmine.createSpy('removeFromCart'),
    clearCart: jasmine.createSpy('clearCart'),
    cartItems: mockCartItems,
    totalPrice: mockTotalPrice
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartComponent, OverlayModule, CurrencyPipe, NgOptimizedImage],
      providers: [
        { provide: ShopStore, useValue: mockShopStore }
      ]
    }).overrideComponent(ShoppingCartComponent, {
    set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the cart visibility when toggleCart is called', () => {
    expect(component.isOpen).toBeFalse();

    component.toggleCart();
    expect(component.isOpen).toBeTrue();

    component.toggleCart();
    expect(component.isOpen).toBeFalse();
  });

  it('should call shopStore.removeFromCart when removeItem is called', () => {
    component.removeItem('1');
    expect(mockShopStore.removeFromCart).toHaveBeenCalledWith('1');
  });

  it('should call shopStore.clearCart and close the cart when clearCart is called', () => {
    component.isOpen = true;

    component.clearCart();
    expect(mockShopStore.clearCart).toHaveBeenCalled();
    expect(component.isOpen).toBeFalse();
  });

  it('should return the correct total price', () => {
    expect(component.totalPrice()).toEqual(49.98);
  });

  it('should display the correct number of items in the cart', () => {
    fixture.detectChanges();
    const cartButton = fixture.debugElement.query(By.css('.cart-button'));
    const itemCountSpan = cartButton.query(By.css('span'));

    expect(itemCountSpan.nativeElement.textContent.trim()).toBe('2');
  });

  it('should display the total price correctly', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const totalPriceElement = fixture.debugElement.query(By.css('.cart-container__header div span'));
    expect(totalPriceElement.nativeElement.textContent).toContain('$49.98');
  });
  it('should render all cart items correctly', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const cartItems = fixture.debugElement.queryAll(By.css('.cart-item'));
    expect(cartItems.length).toBe(2);

    const firstItem = cartItems[0];
    expect(firstItem.query(By.css('.cart-item__title')).nativeElement.textContent).toBe('Game 1');
    expect(firstItem.query(By.css('.cart-item__price')).nativeElement.textContent).toContain('$19.99');

    const secondItem = cartItems[1];
    expect(secondItem.query(By.css('.cart-item__title')).nativeElement.textContent).toBe('Game 2');
    expect(secondItem.query(By.css('.cart-item__price')).nativeElement.textContent).toContain('$29.99');
  });

  it('should remove an item when the remove button is clicked', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const removeButton = fixture.debugElement.query(By.css('.cart-item__remove'));
    removeButton.triggerEventHandler('click', null);

    expect(mockShopStore.removeFromCart).toHaveBeenCalledWith('1');
  });

  it('should clear the cart when the clear cart button is clicked', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('.cart-container__clear-btn'));
    clearButton.triggerEventHandler('click', null);

    expect(mockShopStore.clearCart).toHaveBeenCalled();
    expect(component.isOpen).toBeFalse();
  });
});
