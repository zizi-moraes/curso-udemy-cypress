it('nada agora', function() {})
// Formas antiga de função 

// function soma(a, b){
//     return a + b;
// }
//-----------------------------

// const soma = function(a,b){
//     return a + b;
// }


// Formas nova com Arrow Functions 

// const soma = (a, b) => {
//     return a + b
// }
//-----------------------------

//const soma = (a, b) => a + b //não usar as chaves nesse modo.
//-----------------------------

const soma = a => a + a //não preciso usar o parenteses quando uso um paramentro só.
//-----------------------------

console.log(soma(2, 2))


//************************************************** */

//Função antiga encontra o contexto 
//Function referencia quem o invocou
it('a function test', function() {
    console.log('Function', this)
})

//Arrow function não encontra o contexto
//No arrow, o this ficaria no escopo mais alto e pos isso fica undefined.
it('an arrow test', () => {
    console.log('Arrow', this)
})
