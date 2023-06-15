/// <reference types = "cypress" />

it.only('A external test 1...', () => {})

//O cypress considera somente o último only
describe.only('A group tests', () => {

    describe('Should group test 1...', () => {
        it('A especific test 1...', () => {})
    })
    
    describe('Should group test 2...', () => {
        it('A especific test 1...', () => {})
        it.skip('A especific test 2...', () => {})
        it('A especific test 3...', () => {})
    })
    
    it('A internal test 1...', () => {})
})

