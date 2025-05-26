import { signalStore, withComputed, withState, patchState, withMethods } from "@ngrx/signals";
import { setAllEntities, updateEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { GameCard } from "../models/game-card";
import { computed, inject } from "@angular/core";
import { GamesService } from "../services/games.service";

type ShopState = {
  isLoading: boolean;
  shoppingCart: string[];
  gameOfTheWeek: GameCard | null;
};

const initialState: ShopState = {
  isLoading: false,
  shoppingCart: [],
  gameOfTheWeek: null
};

export const ShopStore = signalStore(
  { providedIn: 'root' },
  withEntities<GameCard>(),
  withState<ShopState>(initialState),
  withComputed(({ shoppingCart, entityMap }) => ({
    cartItemCount: computed(() => shoppingCart().length),
    cartItems: computed(() => {
      const ids = shoppingCart();
      return ids.map(id => entityMap()[id]).filter(Boolean);
    }),
    totalPrice: computed(() => {
      const ids = shoppingCart();
      const gameMap = entityMap();
      return ids
        .map(id => gameMap[id])
        .filter(Boolean)
        .reduce((total, item) => total + item.price, 0);
    }),
  })),
  withMethods((store, gamesService = inject(GamesService)) => ({
    setLoading(isLoading: boolean) {
      patchState(store, { isLoading });
    },
    addToCart(gameId: string) {
      if (!store.shoppingCart().includes(gameId)) {
        patchState(
          store,
          updateEntity({ id: gameId, changes: { inShoppingCart: true }}),
          (state) => ({ shoppingCart: [...state.shoppingCart, gameId] })
        );
      }
    },
    removeFromCart(gameId: string) {
      patchState(
        store,
        updateEntity({ id: gameId, changes: { inShoppingCart: false } }),
        (state) => ({ shoppingCart: state.shoppingCart.filter(id => id !== gameId) })
      );
    },
    fetchGames(userId: string) {
      gamesService.fetchGames(userId)
      .subscribe(games => {
        patchState(store, setAllEntities(games));
      });
    },
    fetchGameOfTheWeek() {
      gamesService.fetchGameOfTheWeek()
      .subscribe(game => {
        patchState(store, { gameOfTheWeek: game });
      });
    },
    clearCart() {
      const items = store.shoppingCart();
      patchState(store,
        { shoppingCart: [] },
        updateEntities({ ids: items, changes: { inShoppingCart: false } })
      );
    }
  }))
);
