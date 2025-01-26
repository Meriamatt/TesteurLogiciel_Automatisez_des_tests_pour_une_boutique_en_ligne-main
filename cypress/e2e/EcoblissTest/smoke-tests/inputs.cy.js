const loginUrl = `${Cypress.env("localUrl")}/#/login`;


describe('template spec', () => {
  it('passes', () => {
    cy.visit(loginUrl);
    cy.get("[data-cy='login-input-username']").should('be.visible').type('mer.ben@gmail.com');
    cy.get("[data-cy='login-input-password']").should('be.visible').type('Test1234');
    cy.get("[data-cy='login-submit']").should('be.visible').click();
    cy.get("[data-cy='nav-link-products']").click();
    cy.get("[data-cy='product-link']").first().click();
    cy.get("[data-cy='detail-product-add']").should('be.visible');
    cy.get("[data-cy='detail-product-quantity']").should('be.visible');
  })

  
})