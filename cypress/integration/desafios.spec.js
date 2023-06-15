/// <reference types = "cypress" />

describe("Work with basic elements", () => {
  //executa uma vez para todos testes
  before(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });

  //executa para cada teste
  beforeEach(() => {
    cy.reload();
  });


  it('Desafio 1 - Testes com alertas', () => {
    const stub = cy.stub().as('alerta')
    
    cy.get('#formCadastrar').click()
    cy.on('window:alert', stub)
    cy.get('#formCadastrar').click()
      .then(() => expect(stub.getCall(1)).to.be.calledWith('Nome eh obrigatorio'))  

    cy.get('#formNome').type('Zizi')
    cy.get('#formCadastrar').click()
      .then(() => expect(stub.getCall(2)).to.be.calledWith('Sobrenome eh obrigatorio')) 

    cy.get('[data-cy=dataSobrenome]').type('Moraes')
    cy.get('#formCadastrar').click()
      .then(() => expect(stub.getCall(3)).to.be.calledWith('Sexo eh obrigatorio'))

    cy.get('#formSexoMasc').click()
    cy.get('#formCadastrar').click()
    cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')

  })

})
