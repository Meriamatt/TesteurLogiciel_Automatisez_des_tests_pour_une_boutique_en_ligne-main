const apiUrl = Cypress.env("apiUrl");

let Token; // Variable pour stocker le token

// Avant tous les tests, récupérez le token
before(() => {
    cy.log('Test login');
    cy.request("POST", `${apiUrl}/login`, {
        username: "test2@test.fr",
        password: "testtest",
    }).then((response) => {
        expect(response.status).to.eq(200); // Vérifiez que la requête a réussi
        Token = response.body.token; // Stockez le token
    });
});

it("Add product", () => {
    cy.log('Post request to add product');
    
    // Vérifiez que le token est disponible
    cy.wrap(Token).should('not.be.undefined').then(() => {
        cy.request({
            method: "PUT",
            url: `${apiUrl}/orders/add`,
            headers: {
                Authorization: `Bearer ${Token}` // Ajoutez le token dans les en-têtes
            },
            body: {
                product: 3,
                quantity: 2
            },
        }).then((response) => {
            expect(response.status).to.eq(406); // Vérifiez que l'ajout n'a pas réussi
            cy.log('The product is unvailable in stock', response);
        });
    });

    
});
