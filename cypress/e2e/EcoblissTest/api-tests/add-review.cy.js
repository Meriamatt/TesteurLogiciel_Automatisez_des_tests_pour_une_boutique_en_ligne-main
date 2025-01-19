const apiUrl = Cypress.env("apiUrl");

let Token; // Variable pour stocker le token

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
it("Add product", () => {
   
    
    
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

it("Test XSS injection in comment", () => {
   
    
    cy.wrap(Token).should('not.be.undefined').then(() => {
        cy.request({
            method: "POST",
            url: `${apiUrl}/reviews`,
            headers: {
                Authorization: `Bearer ${Token}` 
            },
            body: {
                "title": "premier avis",
                "comment": "<script>alert('XSS')</script>",
                "rating": 5
            },
        }).then((response) => {
            expect(response.status).to.eq(200); 
            cy.log(response);
            expect(response.body.comment).to.not.include("<script>");
        });
    });
});
