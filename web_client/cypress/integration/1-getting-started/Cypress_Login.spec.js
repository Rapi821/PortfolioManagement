/// <reference types="cypress" />

describe('Test Start and Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/');
  });

  it('Start', () => {
    cy.get('[data-testid="btnstart"]').click();
    cy.url().should('include', '/LoginRegister');
  });

  it('Login', () => {
    cy.get('[data-testid="btnstart"]').click();
    cy.url().should('include', '/LoginRegister');
    cy.get('[data-testid="emailLogin"]').type('wolfsberger.r03@htlwienwest.at');
    cy.get('[data-testid="passwordLogin"]').type('test123');
    cy.get('[data-testid="btnLogin"]').click();
    cy.url().should('include', '/mainmenu');
  });

  it('CreateCompetition', () => {
    cy.get('[data-testid="btnstart"]').click();
    cy.url().should('include', '/LoginRegister');
    cy.get('[data-testid="emailLogin"]').type('wolfsberger.r03@htlwienwest.at');
    cy.get('[data-testid="passwordLogin"]').type('test123');
    cy.get('[data-testid="btnLogin"]').click();
    cy.url().should('include', '/mainmenu');
    cy.get('[data-testid="btnCompCreate"]').click();
    cy.get('[data-testid="comptitle"]').type('CompTest');
    cy.get('[data-testid="compmoney"]').type(3000);
    cy.get('[data-testid="compenddate"]').type('01.02.2023');
    cy.get('[data-testid="btncompcreate"]').click();
    cy.get('[data-testid="compenddate"]').type('01.02.2023');
    // cy.get('v-data-table').then((items) => {
    //   expect(items[4]).to.contain.text('CompTest');
    // });
  });
  // it('PasswordLength01neg', () => {
  //   cy.get('[data-testid="username"]')
  //     .type('user1')
  //     .should('have.value', 'user1');
  //   cy.get('[data-testid="password"]')
  //     .type('123')
  //     .should('have.value', '123');
  //   cy.get('button:last').click();
  //   cy.get('[data-testid="message"]').should(
  //     'contain.text',
  //     'Password requires at least 4 characters',
  //   );
  // });
});

// it('Start', () => {
//     cy.get('[data-testid="btnstart"]').click();
//     cy.url().should('include', '/LoginRegister');
//   });
// it('PasswordLength01neg', () => {
//   cy.get('[data-testid="username"]')
//     .type('user1')
//     .should('have.value', 'user1');
//   cy.get('[data-testid="password"]')
//     .type('123')
//     .should('have.value', '123');
//   cy.get('button:last').click();
//   cy.get('[data-testid="message"]').should(
//     'contain.text',
//     'Password requires at least 4 characters',
//   );
// });
