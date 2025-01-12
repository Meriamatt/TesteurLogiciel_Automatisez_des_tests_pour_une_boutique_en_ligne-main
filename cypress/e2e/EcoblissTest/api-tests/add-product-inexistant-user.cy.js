const apiUrl = Cypress.env("apiUrl");

let Token; 

before(() => {
    cy.log('Test login');
    cy.request({
        method: "POST",
        url: `${apiUrl}/login`,
        body: {
            username: "meriam@test.fr",
            password: "testtest",
        },
        failOnStatusCode: false // Permet de gérer manuellement les statuts non 2xx
    }).then((response) => {
        expect(response.status).to.eq(401); // Vérifiez que la requête a échoué
        Token = response.body.token; // Stockez le token
    });
});

it("Add product", () => {
    cy.log('Post request to add product');
    
    // Vérifiez que le token est disponible
    cy.wrap(Token).then(() => {
        cy.request({
            method: "PUT",
            url: `${apiUrl}/orders/add`,
            headers: {
                Authorization: `Bearer ${Token}` 
            },
            body: {
                product: 5,
                quantity: 6
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401); 
            
        });
    });
});
