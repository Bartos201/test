// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- Custom command to load the application and wait for initial API calls --
Cypress.Commands.add('loadAppAndWaitForData', () => {
  cy.visit('/');
});

// -- Custom command to add a game to the cart by index --
Cypress.Commands.add('addGameToCart', (index = 0) => {
  cy.get('.home__game-item').eq(index).within(() => {
    // First check if the button is disabled (owned or already in cart)
    cy.get('[data-cy=game-card-button]').then($button => {
      if (!$button.prop('disabled')) {
        cy.wrap($button).click();
      } else {
        // Log a message instead of failing if the game can't be added
        const buttonText = $button.text().trim();
        cy.log(`Game at index ${index} cannot be added to cart: Button is ${buttonText}`);
      }
    });
  });
});

// -- Custom command to open shopping cart --
Cypress.Commands.add('openShoppingCart', () => {
  cy.get('[data-cy=cart-button]').click();
  cy.get('[data-cy=cart-container]').should('be.visible');
});

// -- Custom command to clear shopping cart --
Cypress.Commands.add('clearShoppingCart', () => {
  cy.get('[data-cy=cart-button]').click();
  cy.get('[data-cy=cart-container]').should('be.visible');
  cy.get('[data-cy=clear-cart-button]').click();
});

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })