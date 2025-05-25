describe('Complete Shopping Flow', () => {
  beforeEach(() => {
    cy.loadAppAndWaitForData();
  });  it('should allow a user to complete a shopping flow', () => {
    cy.get('[data-cy=game-list]').should('be.visible');
    cy.get('[data-cy=game-item]').should('have.length.at.least', 1);
    cy.get('[data-cy=featured-game]').should('be.visible');

    // Find non-owned games and add them to the cart
    const targetGamesCount = 3;
    const gameTitles = [];
    let addedGames = 0;
    
    // First find all non-owned games
    cy.get('[data-cy=game-item]')
      .then($games => {
        // Get all the games that aren't owned
        const nonOwnedGames = $games.toArray().filter(game => {
          const buttonText = Cypress.$(game).find('[data-cy=game-card-button]').text().trim();
          return buttonText !== 'Owned' && buttonText !== 'In Cart';
        });

        // Check if we have enough non-owned games for the test
        expect(nonOwnedGames.length, 'Should have enough non-owned games for testing').to.be.at.least(targetGamesCount);
        
        // Add the first N non-owned games to cart
        cy.wrap(nonOwnedGames.slice(0, targetGamesCount)).each(($game, index) => {
          cy.wrap($game).within(() => {
            cy.get('[data-cy=game-card-title]').invoke('text').then(text => {
              gameTitles.push(text.trim());
            });
            cy.get('[data-cy=game-card-button]').click();
          });
          addedGames++;
        });
      });
      
    // 4. Verify cart button shows correct count
    cy.get('[data-cy=cart-count]').should('contain.text', targetGamesCount.toString());
      // 5. Open the cart and check contents
    cy.openShoppingCart();
    cy.get('[data-cy=cart-item]').should('have.length', targetGamesCount);
    
    // 6. Verify each title is in the cart
    cy.wrap(gameTitles).each((title) => {
      cy.get('[data-cy=cart-item-title]').should('contain.text', title);
    });
    
    // 7. Remove one item from cart
    cy.get('[data-cy=remove-cart-item]').first().click();
    cy.get('[data-cy=cart-item]').should('have.length', targetGamesCount - 1);
    
    // 8. Verify cart count updates
    cy.get('[data-cy=cart-items-count]').should('contain.text', `${targetGamesCount - 1} items in cart`);
      // 9. Clear cart and verify it's empty
    cy.get('[data-cy=clear-cart-button]').click();
    cy.get('[data-cy=cart-count]').should('not.exist');
    
    // 10. Add items to cart again
    cy.addGameToCart(0);
    cy.get('[data-cy=cart-count]').should('contain.text', '1');
  });  it('should handle adding the same game multiple times', () => {
    // First find a non-owned game to add to cart
    cy.get('[data-cy=game-item]')
      .then($games => {
        // Get the first non-owned game
        const nonOwnedGames = $games.toArray().filter(game => {
          const buttonText = Cypress.$(game).find('[data-cy=game-card-button]').text().trim();
          return buttonText !== 'Owned' && buttonText !== 'In Cart';
        });

        expect(nonOwnedGames.length, 'Should have at least one non-owned game for testing').to.be.at.least(1);
        
        // Add the game to cart
        cy.wrap(nonOwnedGames[0]).within(() => {
          cy.get('[data-cy=game-card-button]').click();
        });
        
        // Try to add the same game again (it should be disabled now, so use force: true)
        cy.wrap(nonOwnedGames[0]).within(() => {
          // Verify the button now says "In Cart" and is disabled
          cy.get('[data-cy=game-card-button]')
            .should('contain.text', 'In Cart')
            .and('be.disabled');
            
          // Try forcing a click - this should not affect the cart
          cy.get('[data-cy=game-card-button]').click({ force: true });
        });
      });
    
    // Cart should still only show 1 item (no duplicates)
    cy.get('[data-cy=cart-count]').should('contain.text', '1');
    
    // Open cart and verify there's just one item
    cy.openShoppingCart();
    cy.get('[data-cy=cart-item]').should('have.length', 1);
  }); 
  it('should display owned status for games that are owned by the user', () => {
    // First, clear any items that might be in the cart
    cy.get('[data-cy=cart-button]').then($cartButton => {
      // Only try to clear if there are items (cart count exists)
      if ($cartButton.find('[data-cy=cart-count]').length > 0) {
        cy.wrap($cartButton).click();
        cy.get('[data-cy=clear-cart-button]').click();
      }
    });
    
    // Look for games that are marked as owned
    cy.get('.home__game-item').each(($game, index) => {
      // Check if the button says "Owned"
      const buttonText = $game.find('[data-cy=game-card-button]').text().trim();
      
      if (buttonText.includes('Owned')) {
        cy.wrap($game).within(() => {
          // Verify the button is disabled
          cy.get('[data-cy=game-card-button]')
            .should('contain.text', 'Owned')  // Using contain instead of have.text
            .and('be.disabled')
            .and('have.class', 'game-button--owned');
          
          // Try to click it (should not add to cart)
          cy.get('[data-cy=game-card-button]').click({ force: true });
        });
        
        // Get the cart count before trying to check if our click affected it
        cy.get('body').then($body => {
          // Check if cart count exists (there could be other tests leaving items in cart)
          const cartCountExists = $body.find('[data-cy=cart-count]').length > 0;
          
          if (cartCountExists) {
            // If cart count already exists, we can't verify it's not there
            // So just verify the count didn't change by checking it's still the same
            cy.get('[data-cy=cart-count]').invoke('text').then(count => {
              // Wait a moment and verify count hasn't changed
              cy.wait(500);
              cy.get('[data-cy=cart-count]').should('have.text', count);
            });
          } else {
            // If cart count doesn't exist, verify it still doesn't after clicking
            cy.get('[data-cy=cart-count]').should('not.exist');
          }
        });
      }
    });
  });
});
