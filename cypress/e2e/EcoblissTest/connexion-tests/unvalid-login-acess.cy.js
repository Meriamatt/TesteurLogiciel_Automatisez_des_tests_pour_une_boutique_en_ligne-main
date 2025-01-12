describe('unvalid login', () => {
    it('passes', () => {
      cy.visit('http://localhost:8080');
      cy.get("[data-cy='nav-link-login']").click();
      cy.get("[data-cy='login-input-username']").type('testtest2@test.fr');
      cy.get("[data-cy='login-input-password']").type('testtest');
      cy.get("[data-cy='login-submit']").click();
      cy.get("[data-cy='login-errors']").should('contain', 'Identifiants incorrects');
      cy.reload();
      cy.get("[data-cy='login-input-username']").type('test2@test.fr');
      cy.get("[data-cy='login-input-password']").type('test2');
      cy.get("[data-cy='login-submit']").click();
      cy.get("[data-cy='login-errors']").should('contain', 'Identifiants incorrects');
    })
  
    
  })