/// <reference types="cypress" />
import { Cookie } from '../models';

context('Cookies', () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true);
    cy.visit('/');
    cy.clearCookies();
  });

  it('get a sessionId from browser cookie', () => {
    cy.visit('/');
    cy.getCookies()
      .should('have.length', 1)
      .should((cookies: Cookie[]) => {
        expect(cookies[0].name).to.be.equal('sessionId');
    });
  });
});
