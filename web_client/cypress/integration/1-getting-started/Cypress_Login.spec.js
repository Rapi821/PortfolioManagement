/// <reference types="cypress" />

describe('Test Start and Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/');
    cy.get('[data-testid="btnstart"]').click();
    cy.url().should('include', '/LoginRegister');
    cy.get('[data-testid="emailLogin"]').type('wolfsberger.r03@htlwienwest.at');
    cy.get('[data-testid="passwordLogin"]').type('test123');
    cy.get('[data-testid="btnLogin"]').click();
    cy.url().should('include', '/mainmenu');
  });

  // it.skip('Start', () => {
  //   cy.get('[data-testid="btnstart"]').click();
  //   cy.url().should('include', '/LoginRegister');
  // });

  // it.skip('Login', () => {});

  it('create competition', () => {
    cy.get('[data-testid="btnCompCreate"]').click();
    cy.get('[data-testid="comptitle"]').type('CompTest');
    cy.get('[data-testid="compmoney"]').type(3000);
    cy.get('[data-testid="compenddate"]').type('01.02.2023');
    cy.get('[data-testid="btncompcreate"]').click();
    cy.get('[data-testid="compenddate"]').type('01.02.2023');
  });
  it.skip('CheckCompetition', () => {
    cy.get('[data-testid="dataTable"]').contains('CompTest' && '3000€' && 'aktiv'); // Ist zwar nicht für eine Zeile sondern eher ob diese Werte allgemein in der Tabelle vorkommen, aber das Funktioniert zumindest
  });

  it.skip('Buy Stocks', () => {
    cy.get('[data-testid="dataTable"]')
      .contains('Raphis Aktien Game')
      .click();
    cy.get('[data-testid="btnBuyDialog"]').click();
    cy.get('[data-testid="btnBuy"]')
      .contains('Kaufen')
      .click();
    cy.get('[data-testid="MoneyForStock"]').clear();
    cy.get('[data-testid="MoneyForStock"]').type('212');
    cy.get('[data-testid="btnBuyStock"]').click();
    cy.get('[data-testid="PortfolioWert"]').should('contain', '3 000€');
    cy.get('[data-testid="VerfügbaresGeld"]').should('contain', '2 788€');
    cy.get('[data-testid="AktienWert"]').should('contain', '212€');
  });

  it('Dashboard', () => {
    cy.get('[data-testid="dataTable"]')
      .contains('CompTest')
      .click();
    cy.get('[data-testid="PortfolioWert"]').should('contain', '3 000€');
    cy.get('[data-testid="VerfügbaresGeld"]').should('contain', '3 000€');
    cy.get('[data-testid="AktienWert"]').should('contain', '0€');
  });

  it('Main Menu', () => {
    cy.get('[data-testid="dataTable"]')
      .contains('CompTest')
      .click();
    cy.get('[data-testid="btnMainMenu"]').click();
    cy.url().should('include', '/mainmenu');
  });
  // Detail btn
});
