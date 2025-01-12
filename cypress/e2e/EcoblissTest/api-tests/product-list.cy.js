
const apiProduct = `${Cypress.env("apiUrl")}/orders`;
const apiProductId = `${Cypress.env("apiUrl")}/products/8`;
const apiUrl = Cypress.env("apiUrl");

let Token;
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
      //console.log(response);
      
    });
  });