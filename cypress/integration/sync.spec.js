/// <reference types="cypress" />

describe('Esperas', () => {

  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  beforeEach(() => {
    cy.reload()
  })

  it('Deve aguardar elemento estar disponível', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo').should('exist')
    cy.get('#novoCampo').type('funciona')
  })

  it('Deve fazer retries', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo')
      //.should('not.exist') // encadeamento de 2 shoulds direto pode não funcionar.
      .should('exist')
      .type('funciona')
  }) 


  it('Uso do find', () => {
    cy.get('#buttonList').click()
    cy.get('#lista li')
      .find('span')
      .should('contain', 'Item 1')
    cy.get('#lista li span')
      .should('contain', 'Item 2')
  })

  it('Uso do timeout', () => {
    //cy.get('#buttonDelay').click()
    // podemos setar o timeout default no arquivo "cypress.json" -> {"defaultCommandTimeout": 1000}
    // caso precise setar o timeout, o mais aconselhado é usar o exemplo abaixo:
    //cy.get('#novoCampo', {timeout: 1000}).should('exist')

    // cy.get('#buttonListDOM').click()
    // cy.wait(5000)
    // cy.get('#lista li span')
    //   .should('contain', 'Item 2')

    // É melhor usar o timeout no lugar do wait. Ele não precisa esperar todo o tempo
    // que foi definido para achar o elemento, já o wait pode quebrar.
      cy.get('#buttonListDOM').click()
      cy.wait(5000)
      cy.get('#lista li span', { timeout: 30000})
        .should('contain', 'Item 2')
  })

  it.only('Click and retry', () => {
    cy.get('#buttonCount')
      .click()
      .click()
      .should('have.value', '111')
  })

  it.only('Should vs Then', () => {
    cy.get('#buttonListDOM').click()
    // el é um elemento html com jQuery eu não consigo usar o Should, vamos usar o expect
    //cy.get('#lista li span').should($el => {    //Should fica buscando até encontrar
    cy.get('#lista li span').then($el => {        //then aguarda o resultado para depois fazer a busca
      console.log($el)
      expect($el).to.have.length(1)

    })
  })

  it.only('Should vs Then 2', () => {
    cy.get('#buttonListDOM').should($el => {    //should passa
    //cy.get('#buttonListDOM').then($el => {    //then não passa
      expect($el).to.have.length(1)
      return 2
    }).and('have.id', 'buttonListDOM')
  })





})