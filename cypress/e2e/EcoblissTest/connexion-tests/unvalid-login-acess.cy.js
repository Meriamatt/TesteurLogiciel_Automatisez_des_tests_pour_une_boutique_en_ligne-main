const localUrl = Cypress.env("localUrl");

//Test d'une connexion invalide avec des accès incorrects
describe('unvalid login', () => {
    it('passes', () => {
      cy.visit(localUrl);
      cy.get("[data-cy='nav-link-login']").click();
      cy.get("[data-cy='login-input-username']").type('testtest2@test.fr');
      cy.get("[data-cy='login-input-password']").type('testtest');
      cy.get("[data-cy='login-submit']").click();

      // Vérifie l'affichage du message d'erreur
      cy.get("[data-cy='login-errors']").should('contain', 'Identifiants incorrects');

      //recharger la page 
      cy.reload();
      cy.get("[data-cy='login-input-username']").type('test2@test.fr');
      cy.get("[data-cy='login-input-password']").type('test2');
      cy.get("[data-cy='login-submit']").click();
      
      // Vérifie l'affichage du message d'erreur
      cy.get("[data-cy='login-errors']").should('contain', 'Identifiants incorrects');
    })
  
    
  })