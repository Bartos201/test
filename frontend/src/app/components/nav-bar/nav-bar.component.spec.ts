import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { ShopStore } from '../../state/shop.store';
import { computed } from '@angular/core';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    const mockShopStore = {
      cartItems: computed(() => []),
      totalPrice: computed(() => 0)
    };

    await TestBed.configureTestingModule({
      imports: [NavBarComponent],
      providers: [
        { provide: ShopStore, useValue: mockShopStore },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
