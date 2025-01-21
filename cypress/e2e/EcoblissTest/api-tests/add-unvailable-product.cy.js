const apiUrl = Cypress.env("apiUrl");

let Token; 

// Récupération du token 
before(() => {
    cy.log('Test login');
    cy.request("POST", `${apiUrl}/login`, {
        username: "test2@test.fr",
        password: "testtest",
    }).then((response) => {
        expect(response.status).to.eq(200); 
        Token = response.body.token; 
    });
});

it("Add product", () => {
    cy.log('Post request to add product');
    
    
    cy.wrap(Token).should('not.be.undefined').then(() => {

        // Requête PUT pour ajouter un produit inexistant
        cy.request({
            method: "PUT",
            url: `${apiUrl}/orders/add`,
            headers: {
                Authorization: `Bearer ${Token}` 
            },
            body: {
                product: 3,
                quantity: 2
            },
        }).then((response) => {
            // Vérification que le produit est indisponible (statut 406)
            expect(response.status).to.eq(406); 
            cy.log('The product is unvailable in stock', response);
        });
    });

    
});
