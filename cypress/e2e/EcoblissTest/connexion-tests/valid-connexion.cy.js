const localUrl = Cypress.env("localUrl");


//Test de la connexion avec un utilisateur et mot de passe valides
describe('valid login', () => {
    it('passes', () => {
      cy.visit(localUrl);
      cy.get("[data-cy='nav-link-login']").click();
      cy.get("[data-cy='login-input-username']").should('be.visible').type('test2@test.fr');
      cy.get("[data-cy='login-input-password']").should('be.visible').type('testtest');
      cy.get("[data-cy='login-submit']").click();
      //Vérification que l'élément du panier devient visible après une connexion réussie
      cy.get("[data-cy='nav-link-cart']").should('be.visible');
      
    })
  
    
  })