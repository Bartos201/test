# Game Store Application

A modern game storefront built with Angular 18 and powered by a Node.js/Express backend API. This project demonstrates a full-stack TypeScript application with end-to-end testing.

![Game Store Screenshot](frontend/my-shop/src/assets/images/Logo.svg)

## Features

- Browse and search games catalog
- View game details and screenshots
- Add/remove games to shopping cart
- Purchase games
- View owned games library
- Responsive design for all devices

## Project Structure

This project consists of two main parts:
1. A backend API built with Node.js, Express, and TypeScript
2. A frontend application built with Angular 18

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

### Backend Setup (Node.js/Express)

The backend provides RESTful API endpoints for managing games, users, and purchases.

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The backend server will start on http://localhost:3000

### Frontend Setup (Angular)

```bash
# Navigate to the frontend directory
cd frontend/my-shop

# Install dependencies
npm install

# Start the development server
ng serve
```

The Angular application will be available at http://localhost:4200

### Running Tests

#### Unit Tests

To run the Angular unit tests:

```bash
cd frontend/my-shop
npm test
```

#### End-to-End Tests

The project uses Cypress for E2E testing. Before running tests:

1. Install Cypress dependencies:
```bash
cd cypress
npm install
```

2. Make sure both the backend and frontend applications are running:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend/my-shop
npm start
```

3. Run Cypress tests in interactive mode:
```bash
# From the project root
npm run cypress:open
```

4. Select E2E Testing in the Cypress application and choose your preferred browser

## Technologies

- **Frontend**: Angular 18, RxJS, SCSS
- **Backend**: Node.js, Express, TypeScript
- **Testing**: Jasmine, Karma, Cypress



