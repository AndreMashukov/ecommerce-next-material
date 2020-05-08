/// <reference types="cypress" />

context('Cookies', () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true);

    cy.visit('/');
    cy.clearCookies();
  });

  it('get a sessionId from browser cookie', () => {
    cy.visit('/');

    // cy.getCookie() yields a cookie object
    cy.getCookies()
      .should('have.length', 1)
      .should((cookies) => {
        expect(cookies[0].name).to.be.equal('sessionId');
    });
  });
});
