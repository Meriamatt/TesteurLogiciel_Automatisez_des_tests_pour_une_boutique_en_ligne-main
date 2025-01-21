// Récupération de l'URL de l'API depuis la variable d'environnement configurée dans cypress.config.js
const apiUrl = Cypress.env("apiUrl");

// variable pour stocker le token d'authentification
let Token;

// Hook 'before' est exécuté une seule fois avant tous les tests
before(() => {
    cy.log('Test login');
    // Requête POST à l'API pour effectuer une connexion avec les identifiants utilisateur
    cy.request("POST", `${apiUrl}/login`, {
        username: "test2@test.fr",
        password: "testtest",
    }).then((response) => {
        // Vérification que la réponse de l'API a un statut HTTP 200 (succès)
        expect(response.status).to.eq(200); 
        // Stockage du token d'authentification renvoyé dans la réponse
        Token = response.body.token; 
    });
});

it("Add product", () => {
    cy.log('Post request to add product');
    
    // Vérifie que la variable 'Token' n'est pas indéfinie avant d'exécuter la requête
    cy.wrap(Token).should('not.be.undefined').then(() => {

        // Requête PUT à l'API pour ajouter un produit au panier 
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
        }).then((response) => {
            expect(response.status).to.eq(200); 
            cy.log('Product added successfully', response);
        });
    });
    
});
