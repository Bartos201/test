describe('Home Page', () => {
  beforeEach(() => {
    // Use custom command to load app and wait for data
    cy.loadAppAndWaitForData();
  });
  it('should display the page title', () => {
    cy.get('[data-cy=home-title]').should('contain.text', 'Game of the week');
  });

  it('should display the featured game of the week', () => {
    cy.get('[data-cy=featured-game]').should('be.visible');
    cy.get('[data-cy=featured-game-image]').should('have.attr', 'alt', 'Game of the week');
  });

  it('should display a list of games', () => {
    cy.get('[data-cy=game-item]').should('have.length.at.least', 1);
  });
});
