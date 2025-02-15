const apiProduct = `${Cypress.env("apiUrl")}/orders`;

const apiUrl = Cypress.env("apiUrl");
const localUrl = Cypress.env("localUrl");
let Token;


// Tests des produits disponibles en stock
describe('available product in stock', () => {

  //test de connexion et d'ajout d'un produit au panier
    it('passes', () => {
      cy.visit(localUrl);
      cy.get("[data-cy='nav-link-login']").click();
      cy.get("[data-cy='login-input-username']").should('be.visible').type('test2@test.fr');
      cy.get("[data-cy='login-input-password']").should('be.visible').type('testtest');
      cy.get("[data-cy='login-submit']").click();
      cy.get("[data-cy='nav-link-cart']").should('be.visible').click();
      cy.get("[data-cy='nav-link-products']").click();
      cy.get("[data-cy='product-link']").eq(2).click();
      
    cy.get("[data-cy='detail-product-add']").click();
   
      })

  //Test de récupération des produits via l'API
    it('should get product list from API', () => {
        cy.request("POST", apiUrl + "/login", {
          "username": "test2@test.fr",
          "password": "testtest",
          failOnStatusCode: false
    }).then((response) => {
          Token = response.body.token;
          console.log(Token);
          cy.request({
            method: "GET",
            url: apiProduct,
            headers: {
              Authorization: "Bearer " + Token, 
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(200); 
           expect(response.body.orderLines[0].product.id).to.eq(5); 
            console.log(response.body); 
          });
         
    });
        
      });
 
    
  })