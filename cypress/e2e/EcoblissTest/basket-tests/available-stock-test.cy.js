const localUrl = Cypress.env("localUrl");


//Vérification de la disponibilité de produit en stock 
describe('available product in stock', () => {
  it('passes', () => {
    //Visiter la page d'accueill 
    cy.visit(localUrl);
    //Cliquer sur le bouton connexion 
    cy.get("[data-cy='nav-link-login']").click();
    //Vérifier la visibilité des élément, remplir les champs et cliquer sur se connecter 
    cy.get("[data-cy='login-input-username']").should('be.visible').type('test2@test.fr');
    cy.get("[data-cy='login-input-password']").should('be.visible').type('testtest');
    cy.get("[data-cy='login-submit']").click();
    //Vérifier qu'on est bien connecté par la vérification du bouton panier qui doit être visible
    cy.get("[data-cy='nav-link-cart']").should('be.visible').click();
    cy.get("[data-cy='cart-line-delete']").click({ multiple: true });
    cy.get("[data-cy='nav-link-products']").click();
    cy.get("[data-cy='product-link']").eq(2).should('be.visible').click();
    cy.url().should('include', '/products/5');
    cy.get("[data-cy='detail-product-stock']")
      .should('be.visible')
      // Récupère le texte de l'élément
      .invoke('text')
      .should((text) => {
        // Vérifie qu'il y a au moins un chiffre dans le texte
        expect(text).to.match(/\d+/);
      })
      .then((text) => {
        // Extrait le nombre
        const numberInText = parseInt(text.match(/\d+/)[0], 10);
        // Vérifie que le nombre est supérieur à 1
        expect(numberInText).to.be.greaterThan(1);
        cy.log(numberInText);
        cy.get("[data-cy='detail-product-add']").click();
        cy.url().should('include', '/cart');
        cy.go('back');
        cy.url().should('include', '/products/5');
        cy.get("[data-cy='detail-product-stock']")
          .invoke('text')
          .should((text) => {

            expect(text).to.match(/\d+/);
          })
          .then((text) => {
            const numberUpdated = parseInt(text.match(/\d+/)[0], 10);
            //Vérifie que le nombre affiché égale au nombre précédent moins 1 
            expect(numberUpdated).to.eq(numberInText - 1);

          });
      });
  })
})