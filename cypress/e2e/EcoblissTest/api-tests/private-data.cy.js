const apiProduct = `${Cypress.env("apiUrl")}/orders`;
context("GET /orders", () => {
  it("gets a list of products", () => {
    cy.request({
      method: "GET",
      url: apiProduct,
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
    
    
  })
})
