
const apiProduct = `${Cypress.env("apiUrl")}/orders`;
const apiProductId = `${Cypress.env("apiUrl")}/products/8`;
const apiUrl = Cypress.env("apiUrl");

let Token;
let ProductIdList;

before(() => {
    cy.log('test');
    cy.request("POST", apiUrl + "/login", {
          "username": "mer.ben@gmail.com",
          "password": "Test1234",
          failOnStatusCode: false
    }).then((response) => {
          Token = response.body.token;
          console.log(Token);
         
          // Stockez le token dans la variable
    });
});

it("get product list", () => {
    // Utilisez le token dans votre premier test
    cy.request({
      method: "GET",
      url: apiProduct,
      headers: {
        "Authorization": "Bearer " + Token // Utilisez le token ici
      },
      failOnStatusCode: false
      
    }).then((response) => {
      // Vos assertions pour votre test
      expect(response.status).to.eq(200);
      console.log(response.body);
      
    });
  });
  it("get product information", () => {
    // Utilisez le token dans votre premier test
    cy.request({
      method: "GET",
      url: apiProductId,
      headers: {
        "Authorization": "Bearer " + Token // Utilisez le token ici
      },
      failOnStatusCode: false
      
    }).then((response) => {
        ProductIdList = response.body;
      expect(response.status).to.eq(200);
      //console.log(response);
      
    });
  });