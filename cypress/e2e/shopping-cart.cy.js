describe('Shopping Cart', () => {  beforeEach(() => {
    // Use custom command to load app and wait for data
    cy.loadAppAndWaitForData();
    
    // Find non-owned games and add them to the cart
    cy.get('[data-cy=game-item]')
      .then($games => {
        // Get all the games that aren't owned
        const nonOwnedGames = $games.toArray().filter(game => {
          const buttonText = Cypress.$(game).find('[data-cy=game-card-button]').text().trim();
          return buttonText !== 'Owned' && buttonText !== 'In Cart';
        });

        // Check if we have enough non-owned games for the test
        expect(nonOwnedGames.length, 'Should have enough non-owned games for testing').to.be.at.least(2);
        
        // Add the first 2 non-owned games to cart
        cy.wrap(nonOwnedGames[0]).within(() => {
          cy.get('[data-cy=game-card-button]').click();
        });
        
        cy.wrap(nonOwnedGames[1]).within(() => {
          cy.get('[data-cy=game-card-button]').click();
        });
      });
  });
  it('should display cart button with correct item count', () => {
    cy.get('[data-cy=cart-count]').should('contain.text', '2');
  });

  it('should open cart overlay when cart button is clicked', () => {
    cy.get('[data-cy=cart-button]').click();
    cy.get('[data-cy=cart-container]').should('be.visible');
  });

  it('should display correct number of items in the cart', () => {
    cy.get('[data-cy=cart-button]').click();
    cy.get('[data-cy=cart-items-count]').should('contain.text', '2 items in cart');
    cy.get('[data-cy=cart-item]').should('have.length', 2);
  });
  it('should calculate and display the correct total price', () => {
    // Get the individual prices and calculate the total
    let prices = [];
    cy.get('[data-cy=cart-button]').click();
    
    cy.get('[data-cy=cart-item-price]').each(($price) => {
      const priceText = $price.text().trim().replace('$', '');
      prices.push(parseFloat(priceText));
    }).then(() => {
      const expectedTotal = prices.reduce((sum, price) => sum + price, 0);
      
      // Extract the actual total from the UI
      cy.get('[data-cy=cart-total-price]').invoke('text').then((text) => {
        const actualTotal = parseFloat(text.replace('$', '').trim());
        expect(actualTotal).to.be.closeTo(expectedTotal, 0.01);
      });
    });
  });

  it('should remove an item from the cart when remove button is clicked', () => {
    cy.get('[data-cy=cart-button]').click();
    cy.get('[data-cy=cart-item]').should('have.length', 2);
    
    // Remove the first item
    cy.get('[data-cy=remove-cart-item]').first().click();
    
    // Verify there's one item left
    cy.get('[data-cy=cart-item]').should('have.length', 1);
    cy.get('[data-cy=cart-items-count]').should('contain.text', '1 item in cart');
  });

  it('should clear the cart when clear button is clicked', () => {
    cy.get('[data-cy=cart-button]').click();
    cy.get('[data-cy=clear-cart-button]').click();
    
    // Cart should close and shopping cart button should not show any count
    cy.get('[data-cy=cart-container]').should('not.exist');
    cy.get('[data-cy=cart-count]').should('not.exist');
  });
  it('should close the cart when clicking outside', () => {
    cy.get('[data-cy=cart-button]').click();
    cy.get('[data-cy=cart-container]').should('be.visible');
    
    // Click outside the cart (on the backdrop)
    cy.get('.cdk-overlay-backdrop').click({force: true});
    
    // Cart should close
    cy.get('[data-cy=cart-container]').should('not.exist');
  });
});
