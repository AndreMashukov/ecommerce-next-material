/// <reference types="cypress" />

context('Cookies', () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true);
  });

  it('get a sessionId from browser cookie', () => {
    cy.visit('/');
    cy.wait(2000);
    // cy.getCookie() yields a cookie object
    cy.getCookies()
      .should('have.length', 1)
      .should((cookies) => {
        expect(cookies[0].name).to.be.equal('sessionId');
      });
  });
});
