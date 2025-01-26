import { faker } from '@faker-js/faker'; //n’oubliez jamais l’import, qui est nécessaire

const localUrl = Cypress.env("localUrl");
const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password({ length: 20 });
const fakefirstname = faker.person.firstName();
const fakelastname = faker.person.lastName();



describe('registration', () => {
    it('passes', () => {
      cy.visit(localUrl);
      cy.get("[data-cy='nav-link-register']").click();
      cy.get("[data-cy='register-input-lastname']").type(fakelastname);
      cy.get("[data-cy='register-input-firstname']").type(fakefirstname);
      cy.get("[data-cy='register-input-email']").type('!@#$%^&*()_+{{}}:<>?');
      cy.get("[data-cy='register-input-password']").type(fakePassword);
      cy.get("[data-cy='register-input-password-confirm']").type(fakePassword);
      cy.get("[data-cy='register-submit']").click();
      cy.get("[data-cy='register-errors']").should('be.visible');
    })
  
    
  })