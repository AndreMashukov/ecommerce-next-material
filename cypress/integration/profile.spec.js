// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

import { login } from "../support/login";

describe('User Profile', () => {
  it('logs user in', async () => {
    login();
    cy.url().should('contain', '/profile');
  });
});
