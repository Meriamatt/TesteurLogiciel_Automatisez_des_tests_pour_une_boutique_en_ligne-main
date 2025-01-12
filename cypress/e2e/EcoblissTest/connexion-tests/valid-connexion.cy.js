describe('valid login', () => {
    it('passes', () => {
      cy.visit('http://localhost:8080');
      cy.get("[data-cy='nav-link-login']").click();
      cy.get("[data-cy='login-input-username']").should('be.visible').type('test2@test.fr');
      cy.get("[data-cy='login-input-password']").should('be.visible').type('testtest');
      cy.get("[data-cy='login-submit']").click();
      cy.wait(5000);
      cy.get("[data-cy='nav-link-cart']").should('be.visible');
      
    })
  
    
  })