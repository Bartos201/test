describe('Nav Bar', () => {
  beforeEach(() => {
    cy.loadAppAndWaitForData();
  });

  it('should display the navigation bar', () => {
    cy.get('.navbar').should('be.visible');
  });

  it('should display the logo', () => {
    cy.get('.navbar__logo').should('be.visible');
    cy.get('.navbar__logo img.logo').should('be.visible')
      .and('have.attr', 'alt', 'Shop Logo');
  });
  it('should display the shopping cart button', () => {
    cy.get('.navbar__cart').should('be.visible');
    cy.get('[data-cy=cart-button]').should('be.visible');
  });
});
