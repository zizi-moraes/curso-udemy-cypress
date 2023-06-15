it('sem testes, ainda', () => { })

//Forma antiga - temos problemas com aninhamentos de callback (callback hell)
// const getSomething = callback => {
//     setTimeout(() => {
//         callback(12);
//     }, 1000)
// }

// const system = () => {
//     console.log('init');
//     getSomething(some => console.log(`Something is ${some}`));
//     console.log('end')
// }


//Forma nova sem callback 
const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000)
    }) 
}

// const system = () => {
//     console.log('init');
//     getSomething().then(some => {
//         console.log(`Something is ${some}`);
//     })
//     console.log('end')
// }


// Usando o async/await deixa o uso da promise mais simplificada
const system = async () => {
    console.log('init');
    const some = await getSomething()
    console.log(`Something is ${some}`);
    console.log('end')
}


system();