const apiUrl = Cypress.env("apiUrl");

let Token; 

before(() => {
    cy.log('Test login');
    cy.request({
        // Requête POST à l'API pour effectuer une connexion avec un identifiant inexistant
        method: "POST",
        url: `${apiUrl}/login`,
        body: {
            username: "meriam@test.fr",
            password: "testtest",
        },
        // Empêche Cypress d'échouer automatiquement pour un statut HTTP autre que 200 
        failOnStatusCode: false 
    }).then((response) => {

        // Vérification que la réponse de l'API a un statut HTTP 401 (non autorisé)
        expect(response.status).to.eq(401); 
        Token = response.body.token; 
    });
});

it("Add product", () => {
    cy.log('Post request to add product');
    // Requête PUT à l'API pour ajouter un produit au panier
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
