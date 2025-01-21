
// URL pour récupérer le panier 
const apiProduct = `${Cypress.env("apiUrl")}/orders`;
// URL pour récupérer les détails d'un produit spécifique du panier
const apiProductId = `${Cypress.env("apiUrl")}/products/8`;
// Base de l'URL de l'API
const apiUrl = Cypress.env("apiUrl");

let Token;
// Variable pour stocker les informations du produit
let ProductIdList;

before(() => {
    cy.log('test');
    cy.request("POST", apiUrl + "/login", {
          "username": "test2@test.fr",
          "password": "testtest",
          failOnStatusCode: false
    }).then((response) => {
          Token = response.body.token;
          console.log(Token);
         
          
    });
});

it("get product list", () => {
    
  // Requête GET pour récupérer les données du panier
    cy.request({
      method: "GET",
      url: apiProduct,
      headers: {
        "Authorization": "Bearer " + Token 
      },
      failOnStatusCode: false
      
    }).then((response) => {
      
      expect(response.status).to.eq(200);
      console.log(response.body);
      
    });
  });
  it("get product information", () => {
    // Requête GET pour récupérer les informations de apiProductId du panier
    cy.request({
      method: "GET",
      url: apiProductId,
      headers: {
        "Authorization": "Bearer " + Token 
      },
      failOnStatusCode: false
      
    }).then((response) => {
        ProductIdList = response.body;
      expect(response.status).to.eq(200);
      
    });
  });