/// <reference types="cypress" />

describe('Helpers...', () => {

  // o should é do cypress então quando usamos um objeto, temos que usar o expect
  it('Should', () => {
    const obj = { nome: 'User', idade: 20}
    cy.obj.should('to.have.property', 'nome') 
  })

  it('Expect', () => {
    const obj = { nome: 'User', idade: 20}
    expect(obj).to.have.property('nome') 
  })

 // com o Wrap voltamos a usar a validacao do cypress
  it('Wrap', () => {
    const obj = { nome: 'User', idade: 20}
    cy.wrap(obj).should('to.have.property', 'nome') 
  })

  it('Wrap com promisse', () => {
    const obj = { nome: 'User', idade: 20}
    expect(obj).to.have.property('nome') 
    cy.wrap(obj).should('to.have.property', 'nome') 
    cy.visit("https://wcaquino.me/cypress/componentes.html");

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(10)
      }, 500)
    })

    cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
     // a promisse retorna a informacao não sincronizado com o nosso script - ver log
    //promise.then(num => console.log(num))        
    
    //usando o wrap a execução dos passos fica sincronizado - promise gerenciado pelo cypress - mais recomendado
    cy.wrap(promise).then(ret => console.log(ret))  
    cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão'))

    cy.wrap(1).should(num => {
      return 2
    }).should('be.equal', 1)
  })

  //Its
  //Its pega a propriedade do objeto
  it('Its...', () => {
    const obj = { nome: 'User', idade: 20 }
    //cy.wrap(obj).should('have.property', 'nome', 'User')
    cy.wrap(obj).its('nome').should('be.equal', 'User')

    const obj2 = { nome: 'User', idade: 20, endereco: { rua: 'teste'} }
    cy.wrap(obj2).its('endereco').should('have.property', 'rua')
    cy.wrap(obj2).its('endereco').its('rua').should('contain', 'tes')

    cy.visit("https://wcaquino.me/cypress/componentes.html");
    cy.title().its('length').should('be.equal', 20)

  })

  //Invoke
  //Its trabalha com as funções

  it.only('Invoke...', () => {
    const getValue = () => 1
    const soma = (a, b) => a + b

    cy.wrap({ fn:getValue }).invoke('fn').should('be.equal', 1)
    cy.wrap({ fn:soma }).invoke('fn', 2, 5).should('be.equal', 7)

    cy.visit("https://wcaquino.me/cypress/componentes.html");
    cy.get('#formNome').invoke('val', 'Texto via invoke')
    cy.window().invoke('alert', 'Dá pra ver?')
    cy.get('#resultado')
      .invoke('html', '<input type="button" value="hacked!"/>')
  })

})




