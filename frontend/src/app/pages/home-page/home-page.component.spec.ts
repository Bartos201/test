import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { ShopStore } from '../../state/shop.store';
import { signal } from '@angular/core';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [
        {
          provide: ShopStore,
          useValue:
          {
            fetchGames: jasmine.createSpy('fetchGames'),
            fetchGameOfTheWeek: jasmine.createSpy('fetchGameOfTheWeek'),
            gameOfTheWeek: signal(null),
            entities: signal([]),
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
