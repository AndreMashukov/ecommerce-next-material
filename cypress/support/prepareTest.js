export const prepareTest = () => {
  const api = require('../../global-definitions.json').dev.baseUrl;
  const prepareTestEndpoint = `${api}/personal/orders/test/prepare`
  let userState = JSON.parse(localStorage.getItem('userState'));

  cy.log('user id', userState.id);
  expect(userState.id.length).to.eq(36);

  cy.request('POST', prepareTestEndpoint, {
    id: userState.id
  }).then(response => {
    expect(response.status).to.eq(200);
    cy.log('prepareTest response', response.body);
  });
}
