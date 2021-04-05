// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

import { login } from "../support/login";
import { prepareTest } from "../support/prepareTest";

describe('Creates an order', () => {
  before(() => {
    login();
    cy.wait(100).then(() => {
      prepareTest();
    });
  });

  it('Navigates to /profile page after login', async () => {
    cy.url().should('contain', '/profile');
  });
});
