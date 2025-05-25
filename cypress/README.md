# E2E Testing with Cypress for My Shop

This directory contains Cypress end-to-end tests for the My Shop application.

## Test Organization

The tests are organized into the following files:

- `home.cy.js`: Tests for the home page layout and content
- `game-card.cy.js`: Tests for individual game card functionality
- `shopping-cart.cy.js`: Tests for shopping cart operations
- `nav-bar.cy.js`: Tests for navigation bar elements
- `complete-flow.cy.js`: End-to-end tests for complete shopping flows

## Running the Tests

### Prerequisites

1. Make sure both the backend and frontend applications are running:
   - Backend: `cd ../../backend && npm run dev`
   - Frontend: `cd ../my-shop && npm start`

2. Run Cypress tests in interactive mode:
   ```
   npm run cypress:open
   ```

