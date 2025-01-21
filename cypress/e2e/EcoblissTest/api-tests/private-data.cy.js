
// Définition de l'URL de l'API pour récupérer le panier
const apiProduct = `${Cypress.env("apiUrl")}/orders`;


context("GET /orders", () => {
  it("gets a list of products", () => {
    //Requete GET pour récupérer les données du panier
    cy.request({
      method: "GET",
      url: apiProduct,
      failOnStatusCode: false 
    }).then((response) => {
      // Vérification que l'accès est interdit (status 403)
      expect(response.status).to.eq(403);
    });
    
    
  })
})
