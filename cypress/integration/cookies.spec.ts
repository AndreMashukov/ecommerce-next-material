/// <reference types="cypress" />
import { Cookie } from '../models/Cookie';

context('Cookies', () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true);
    cy.visit('/');
    cy.clearCookies();
  });

  it('get a sessionId from browser cookie', () => {
    let browserCookies: Cookie[];
    cy.visit('/');
    cy.getCookies()
      .should('have.length', 1)
      .should((cookies) => {
        browserCookies = cookies;
        expect(browserCookies[0].name).to.be.equal('sessionId');
    });
  });
});
