import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameCardComponent } from './game-card.component';
import { ShopStore } from '../../state/shop.store';
import { By } from '@angular/platform-browser';
import { Component, signal } from '@angular/core';
import { GameCard } from '../../models/game-card';

@Component({
  standalone: true,
  imports: [GameCardComponent],
  template: `<app-game-card [game]="gameData"></app-game-card>`
})
class TestHostComponent {
  gameData: GameCard = {
    id: 'test-1',
    title: 'Test Game',
    price: 59.99,
    imageUrl: 'test.jpg',
    discount: 0,
    inShoppingCart: false,
    owned: false
  };
}

describe('GameCardComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  const mockShopStore = {
    addToCart: jasmine.createSpy('addToCart'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        { provide: ShopStore, useValue: mockShopStore }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should display game information correctly', () => {
    const titleElement = fixture.debugElement.query(By.css('.game-card__title')).nativeElement;
    const priceButton = fixture.debugElement.query(By.css('.game-button')).nativeElement;

    expect(titleElement.textContent).toContain('Test Game');
    expect(priceButton.textContent.trim()).toContain('$59.99');
  });

  it('should add game to cart when price button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.game-button'));
    button.nativeElement.click();
    fixture.detectChanges();

    expect(mockShopStore.addToCart).toHaveBeenCalledWith('test-1');
  });

  it('should display In Cart when game is in shopping cart', () => {
    hostComponent.gameData = {
      ...hostComponent.gameData,
      inShoppingCart: true
    };
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.game-button')).nativeElement;
    expect(button.textContent.trim()).toContain('In Cart');
    expect(button.disabled).toBeTrue();
  });

  it('should display discount when available', () => {
    hostComponent.gameData = {
      ...hostComponent.gameData,
      discount: 25
    };
    fixture.detectChanges();

    const discountElement = fixture.debugElement.query(By.css('.game-button--discount'));
    expect(discountElement).toBeTruthy();
    expect(discountElement.nativeElement.textContent).toContain('-25%');
  });
});
