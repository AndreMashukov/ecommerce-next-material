// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('Ecommerce Frontend', () => {
  it('API works', () => {
    const api = require('../../global-definitions.json').dev.baseUrl;
    cy.request('GET', api).then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.body).to.have.property('name', 'ecommerce-backend');
    });
  });
});
