// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

import { login } from "../support/login";

describe('User Profile', () => {
  before(() => {
    login();
  });

  it('Navigates to /profile page after login', async () => {
    cy.url().should('contain', '/profile');
  });
});
