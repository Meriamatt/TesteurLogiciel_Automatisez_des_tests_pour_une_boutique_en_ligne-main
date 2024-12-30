describe('add negative number of product', () => {
    it('passes', () => {
      cy.visit('http://localhost:8080');
      cy.get("[data-cy='nav-link-login']").click();
      cy.get("[data-cy='login-input-username']").should('be.visible').type('test2@test.fr');
      cy.get("[data-cy='login-input-password']").should('be.visible').type('testtest');
      cy.get("[data-cy='login-submit']").click();
      cy.wait(5000);
      cy.get("[data-cy='nav-link-cart']").should('be.visible');
      cy.get("[data-cy='nav-link-products']").click();
      cy.get("[data-cy='product-link']").eq(2).click();
      cy.wait(5000);
     cy.get("[data-cy='detail-product-quantity']").clear().type('-1');
     cy.get("[data-cy='detail-product-add']").click();
     cy.get("[data-cy='detail-product-quantity']").clear().type('21');
     cy.get("[data-cy='detail-product-add']").click();
    })
  
    
  })