const localUrl = Cypress.env("localUrl");

describe('valid login', () => {
    it('passes', () => {
      cy.visit(localUrl);
      cy.get("[data-cy='nav-link-login']").click();
      cy.get("[data-cy='login-input-username']").should('be.visible').type('test2@test.fr');
      cy.get("[data-cy='login-input-password']").should('be.visible').type('testtest');
      cy.get("[data-cy='login-submit']").click();
      cy.get("[data-cy='nav-link-cart']").should('be.visible');
      
    })
  
    
  })