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

  it("Text", () => {
    cy.get("body").should("contain", "Cuidado"); //busca muito genérica
    cy.get("span").should("contain", "Cuidado"); //busca generica
    cy.get(".facilAchar").should("contain", "Cuidado"); //frase curta
    cy.get(".facilAchar").should(
      "have.text",
      "Cuidado onde clica, muitas armadilhas..."
    ); //melhor validação
  });

  it("Links", () => {
    // Mapeando elemento  - get
    cy.get('[href="#"]').click();
    cy.get("#resultado").should("have.text", "Voltou!");
    cy.reload();
    cy.get("#resultado").should("have.not.text", "Voltou!");

    // Mapeando elemento por texto - contains
    cy.contains("Voltar").click();
    cy.get("#resultado").should("have.text", "Voltou!");
  });

  it("TextFields", () => {
    cy.get("#formNome")
      .type("Cypress text")
      .should("have.value", "Cypress text");

    //adição de barras para o cypress reconhece o :
    cy.get("#elementosForm\\:sugestoes")
      .type("textarea")
      .should("have.value", "textarea");

    cy.get(
      "#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input"
    ).type("texto");

    cy.get("[data-cy=dataSobrenome]")
      .type("Moraes12{backspace}{backspace}")
      .should("have.value", "Moraes");

    cy.get("#elementosForm\\:sugestoes")
      .clear()
      .type("Erro{selectall}acerto", { delay: 200 })
      .should("have.value", "acerto");
  });

  it("RadioButton", () => {
    cy.get("#formSexoFem").click().should("be.checked");
    cy.get("#formSexoMasc").should("not.be.checked");
    cy.get("[name='formSexo']").should("have.length", 2);
  });

  it("Checkbox", () => {
    cy.get("#formComidaPizza").click().should("be.checked");
    cy.get('[name =formComidaFavorita]').click({ multiple: true });
    cy.get("#formComidaPizza").should("not.be.checked");
    cy.get('#formComidaVegetariana').should('be.checked')

  });

  it('Combo', () => {
    cy.get('[data-test=dataEscolaridade]')
      .select('2o grau completo')
      .should('have.value', '2graucomp') //should só valida a propriedade value. o texto não.

      cy.get('[data-test=dataEscolaridade] option').should('have.length', 8)
      cy.get('[data-test=dataEscolaridade] option').then($arr => {
        const values = []
        $arr.each(function(){
          values.push(this.innerHTML)
        })
        expect(values).to.include.members(["Superior", "Mestrado"])
      })
    })

  it.only('Combo Multiplo', () => {
    cy.get('[data-testid=dataEsportes]')
      .select(['natacao', 'Corrida', 'nada']) //no combo multiplo temos que mandar o value - nesse caso mandamos um array.
      
    //cy.get('[data-testid=dataEsportes]').should('have.value',['natacao', 'Corrida', 'nada'] )
    cy.get('[data-testid=dataEsportes]').then($el => {
      expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
      expect($el.val()).to.have.length(3)
    })

    cy.get('[data-testid=dataEsportes]')
      .invoke('val')
      .should('eql', ['natacao', 'Corrida', 'nada'])
  })

});
