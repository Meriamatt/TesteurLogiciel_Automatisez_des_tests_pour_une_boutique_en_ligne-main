describe('available product in stock', () => {
    it('passes', () => {
      cy.visit('http://localhost:8080');
      cy.get("[data-cy='nav-link-login']").click();
      cy.get("[data-cy='login-input-username']").should('be.visible').type('test2@test.fr');
      cy.get("[data-cy='login-input-password']").should('be.visible').type('testtest');
      cy.get("[data-cy='login-submit']").click();
      cy.wait(5000);
      cy.get("[data-cy='nav-link-cart']").should('be.visible').click();
      cy.get("[data-cy='cart-line-delete']").click({ multiple: true });
      cy.get("[data-cy='nav-link-products']").click();
      cy.get("[data-cy='product-link']").eq(2).click();
      cy.wait(5000);
      
      cy.get("[data-cy='detail-product-stock']")
  .invoke('text') // Récupère le texte de l'élément
  .then((text) => {
    const numberInText = parseInt(text.match(/\d+/)[0], 10); // Extrait le nombre
    expect(numberInText).to.be.greaterThan(1); // Vérifie que le nombre est supérieur à 1
    cy.log(numberInText);
    cy.get("[data-cy='detail-product-add']").click();
      cy.wait(5000);
      cy.go('back');
      cy.wait(5000);
      cy.get("[data-cy='detail-product-stock']")
  .invoke('text') 
  .then((text) => {
    const numberUpdated = parseInt(text.match(/\d+/)[0], 10); 
    expect(numberUpdated).to.eq(numberInText-1);//be.lessThan(numberInText); 
    
  });
    
  });
      
      
    })
 
    
  })