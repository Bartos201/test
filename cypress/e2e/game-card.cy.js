describe('Game Card', () => {
  beforeEach(() => {
    // Use custom command to load app and wait for data
    cy.loadAppAndWaitForData();
  });
  it('should display game cards with correct information', () => {
    // Check the first game card has all expected elements
    cy.get('.home__game-item').first().within(() => {
      cy.get('[data-cy=game-card-title]').should('exist');
      cy.get('[data-cy=game-card-button]').should('exist');
      cy.get('[data-cy=game-card-image]').should('exist');
    });
  });

  it('should add a game to the cart when the add button is clicked', () => {
    // Find game card and get its title
    let gameTitle;
    cy.get('.home__game-item').first().within(() => {
      cy.get('[data-cy=game-card-title]').invoke('text').then(text => {
        gameTitle = text.trim();
      });
      // Click the add to cart button
      cy.get('[data-cy=game-card-button]').click();
    });

    // Verify item appears in shopping cart
    cy.get('[data-cy=cart-button]').click();
    cy.get('[data-cy=cart-item]').should('exist');
    cy.get('[data-cy=cart-item-title]').invoke('text').then(text => {
      expect(text.trim()).to.equal(gameTitle);
    });
  });
  it('should show discounted price for games with a discount', () => {
    // Check for games with discounts
    cy.get('.home__game-item').each(($card) => {
      const hasDiscount = $card.find('[data-cy=game-card-discount]').length > 0;
      
      if (hasDiscount) {
        cy.wrap($card).within(() => {
          cy.get('[data-cy=game-card-discount]').should('be.visible');
        });
      }
    });
  });
});
