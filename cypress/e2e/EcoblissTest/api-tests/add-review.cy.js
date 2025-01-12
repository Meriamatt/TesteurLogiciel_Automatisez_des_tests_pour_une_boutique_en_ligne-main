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
   
    
    // Vérifiez que le token est disponible
    cy.wrap(Token).should('not.be.undefined').then(() => {
        cy.request({
            method: "POST",
            url: `${apiUrl}/reviews`,
            headers: {
                Authorization: `Bearer ${Token}` // Ajoutez le token dans les en-têtes
            },
            body: {
                "title": "premier avis",
                "comment": "super produits",
                "rating": 5
            },
        }).then((response) => {
            expect(response.status).to.eq(200); // Vérifiez que l'ajout a réussi
            cy.log('review added successfully', response);
        });
    });
});
