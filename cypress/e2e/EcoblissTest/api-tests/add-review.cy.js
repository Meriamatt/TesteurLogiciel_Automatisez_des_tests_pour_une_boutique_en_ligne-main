const apiUrl = Cypress.env("apiUrl");

let Token; 

// Avant tous les tests, récupérez le token
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
it("Add review", () => {
   
    cy.wrap(Token).should('not.be.undefined').then(() => {
        cy.request({
            method: "POST",
            url: `${apiUrl}/reviews`,
            headers: {
                Authorization: `Bearer ${Token}` 
            },
            body: {
                "title": "premier avis",
                "comment": "super produits",
                "rating": 5
            },
        }).then((response) => {
            expect(response.status).to.eq(200); 
            cy.log('review added successfully', response);
        });
    });
});
it("Test CSRF protection", () => {
   
        cy.request({
            method: "POST",
            url: `${apiUrl}/reviews`,
            headers: {
                // Simule une origine externe malveillante
                url: "http://malicious-website.com"
            },
            body: {
                "title": "test avis",
                "comment": "CSRF attack",
                "rating": 5
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.not.equal(200); 
            
        });
   
});

// Vérification de la protection contre les injections XSS 
it("Test XSS injection in comment", () => {
   
    
    cy.wrap(Token).should('not.be.undefined').then(() => {

        // Requête POST pour ajouter un commentaire contenant un script malveillant
        cy.request({
            method: "POST",
            url: `${apiUrl}/reviews`,
            headers: {
                Authorization: `Bearer ${Token}` 
            },
            body: {
                "title": "test avis",
                // Script injecté pour tester la faille XSS
                "comment": "<script>alert('XSS')</script>",
                "rating": 5
            },
        }).then((response) => {
            expect(response.status).to.eq(200); 
            cy.log(response);
            // Vérification que le contenu du commentaire ne contient pas le script injecté 
            expect(response.body.comment).to.not.include("<script>");
        });
    });
});
