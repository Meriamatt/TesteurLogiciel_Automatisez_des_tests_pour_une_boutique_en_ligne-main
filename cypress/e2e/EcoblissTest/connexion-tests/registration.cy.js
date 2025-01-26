import { faker } from '@faker-js/faker'; 

const localUrl = Cypress.env("localUrl");

//génération des données aléatoires avec faker
const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password({ length: 20 });
const fakefirstname = faker.person.firstName();
const fakelastname = faker.person.lastName();


//Test d'inscription
describe('registration', () => {
    it('passes', () => {
      cy.visit(localUrl);
      cy.get("[data-cy='nav-link-register']").click();
      cy.get("[data-cy='register-input-lastname']").type(fakelastname);
      cy.get("[data-cy='register-input-firstname']").type(fakefirstname);
      cy.get("[data-cy='register-input-email']").type(fakeEmail);
      cy.get("[data-cy='register-input-password']").type(fakePassword);
      cy.get("[data-cy='register-input-password-confirm']").type(fakePassword);
      cy.get("[data-cy='register-submit']").click();
      //vérification de la présence du lien du panier qui ne s'affiche qu'après connexion
      cy.get("[data-cy='nav-link-cart']").should('be.visible');
    })
  
    
  })