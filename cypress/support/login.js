export const login = () => {
  cy.visit('/auth');
  cy.get('[data-cy=login-email]').type('aaa@aaa.com');
  cy.get('[data-cy=login-password]').type('q1q1q1');
  cy.get('[data-cy=login-submit]').click();
  cy.log('navigates to /profile page');
  // cy.get('.Mui-focused > .MuiInputBase-input').dblclick();
  // cy.get('.Mui-focused > .MuiInputBase-input').type('Surname1');
  // cy.get('.Mui-focused > .MuiInputBase-input').dblclick();
  // cy.get('.Mui-focused > .MuiInputBase-input').type('Name1');
  // cy.get('.MuiGrid-root:nth-child(2) > .MuiGrid-root .MuiButton-label').click();
  // cy.get('.MuiGrid-root:nth-child(3) > .MuiTypography-root > .MuiTypography-root').click();
  // http://localhost:8000/personal/profile
  cy.wait(1000);
}
