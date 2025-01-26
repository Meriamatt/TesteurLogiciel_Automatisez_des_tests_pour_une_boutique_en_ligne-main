const apiProduct = `${Cypress.env("apiUrl")}/orders`;
const localUrl = Cypress.env("localUrl");


describe('add negative number of product', () => {
  it('passes', () => {
    cy.visit(localUrl);
    cy.get("[data-cy='nav-link-login']").click();
    cy.get("[data-cy='login-input-username']").should('be.visible').type('test2@test.fr');
    cy.get("[data-cy='login-input-password']").should('be.visible').type('testtest');
    cy.get("[data-cy='login-submit']").click();
    cy.get("[data-cy='nav-link-cart']").should('be.visible').click();
    cy.get("[data-cy='cart-line-delete']").click({ multiple: true });
    cy.get("[data-cy='nav-link-products']").click();
    cy.get("[data-cy='product-link']").eq(2).click();
    cy.url().should('include', '/products/5');
    cy.get("[data-cy='detail-product-quantity']").clear().type('-1');
    cy.get("[data-cy='detail-product-add']").click();
    cy.get("[data-cy='detail-product-quantity']").clear().type('21');
    cy.get("[data-cy='detail-product-add']").click();
    cy.intercept('GET', apiProduct).as('getData');

    cy.get("[data-cy='nav-link-cart']").click();

    cy.wait('@getData').its('response.statusCode').should('eq', 200);
    cy.get('[data-cy="cart-line-image"][alt="Poussière de lune"]').should('not.exist');

  })


})