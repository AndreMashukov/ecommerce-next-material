// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('Ecommerce Frontend', () => {
  it('API works', async () => {
    const api = require('../../global-definitions.json').dev.baseUrl;
    const response = await cy.request('GET', api);
    expect(response.body).to.have.property('name', 'ecommerce-backend');
  });
});
