export const prepareTest = () => {
  let userState = JSON.parse(localStorage.getItem('userState'));
  cy.log('user id', userState.id);
  expect(userState.id.length).to.eq(36);
}
