const readline = require('readline-sync')
const colors = require('colors')

console.log('WELCOME TO NIX\'S CALCULATOR!\n'.bold.blue)

readline.question('DISCLAIMER: This calculator currently has two features available: derivation and integration.\
    \nINSTRUCTIONS: Input all expressions using the format: [base][variable]^[exponent] with space in between each expression and operand.\nex. 3X^5 + 5X^-1\n\nPRESS THE ENTER KEY TO CONTINUE: '.bold)
    
let choice = readline.question('\nPlease select an operation: \n[1] Derivation \n[2] Integration \n\nChoice: ').toLowerCase()

while ((choice >= 'a' && choice <= 'z') || (choice !== '1' && choice !== '2')) {
    console.log('INVALID CHOICE!'.bold.red)
    choice = readline.keyIn('\nPlease select an operation: \n[1] Derivation \n[2] Integration \n\nChoice: ').toLowerCase()
}

console.clear()
choice = Number(choice)

let input;

// input query based on choice selection
if (choice == 1) {
    input = readline.question('Input string to be derived: ').trim()
} else {
    input = readline.question('Input string to be integrated: ').trim()
}

// array methods application
let inputArray = input.split(' ')
let operandArray = inputArray.filter(s => s == '+' || s == '-')

inputArray = inputArray.filter(s => s != '+' && s != '-')
let checker = inputArray.filter(x => x.indexOf('^') != x.length - 1)

if (inputArray.length != checker.length) {

    console.error('INVALID INPUT!'.bold.red)

} else if (inputArray.length != operandArray.length + 1) {

    console.error('INVALID NUMBER OF OPERANDS!'.bold.red)

} else {

    let exponent, variable, base, final  = '', answerArray = [];

    // checks for division of exp or base
    function check (x) {
        if (x.includes('/')) {
            let index= x.indexOf('/')
            x = Number(Number(x.slice(0, index))/Number(x.slice(index + 1, x.length)))
        } else {
            x = Number(x)
        }
    
        if (Math.floor(x) != x) {
            x = Number(x.toFixed(2))
        }
    
        return x;
    }
    
    // round functions defined by choice.
    function roundD (base, exponent) {
            if ((base*exponent != Math.round(base*exponent))) {
                base = (base*exponent).toFixed(2)
            } else {
                base = base*exponent
            }
        
            return base
    }      

    function roundI (base, exponent) {
            if ((base*(1/(exponent + 1))) != Math.round(base*(1/(exponent + 1)))) {
                base = (base*(1/(exponent + 1))).toFixed(2)
            } else {
                base = (base*(1/(exponent + 1)))
            }
        
            return base
    }  
    
    // general derivation/integration function
    function operation (x) {
        if (x.includes('^') && x.search(/[a-z]/gi) > - 1) {
            let searchFactor = x.indexOf('^')
    
            exponent = x.slice(searchFactor + 1, x.length)
            exponent = check(exponent);    
    
            variable = x.slice(searchFactor - 1, searchFactor)
        
            // base value
            if (x.indexOf(variable) == 0) {
                base = 1
            } else {
                base = x.slice(0, x.indexOf(variable))
                base = check(base);
            }

            if (choice == 1) {
                if (exponent === 1) {
                    answer = `${(base)}`
        
                } else if (exponent > 0 || exponent < 0) {
                    answer = `${roundD(base, exponent)}${variable}^${(exponent - 1)}`
                } else if (exponent === 0) {
                    answer = '0'
                }
        
                return answer
            } else {
                if (exponent != -1) {
                    answer = `${roundI(base, exponent)}${variable}^${exponent + 1}`
                } else {
                    answer = `${(base)} ln(${variable})`
                }
                return answer
            }

        } else if (x.search(/[a-z]/gi) > -1) {
            let searchFactor = x.length - 1
            variable = x.slice(searchFactor, x.length)

            if (choice == 1) {
                if (x.indexOf(variable) != 0) {
                    base = x.slice(0, searchFactor)
                    base = check(base)                     
                } else {
                    base = 1
                }

                answer = `${(base)}`
            
            } else {
                exponent = 1

                if (x.indexOf(variable) != 0) {
                    base = x.slice(0, searchFactor)
                    base = check(base)
                } else {
                    base = 1
                }
                        
                answer = `${roundI (base, exponent)}${variable}^${(exponent + 1)}`
            }

            return answer
    
        } else {
            if (choice == 1) {
               answer = '0'             
            } else {
                base = x
                base = check(base)
                answer = `${base}X`
            }
 
            return answer
        } 
    }
    
    answerArray = inputArray.map(x => operation(x))
    
    if (operandArray.length >= 1) {
        while (operandArray.length != 0) {
            for (solution of answerArray) {
                if (operandArray.length >= 1) {
                    final += ` ${solution}` + ` ${operandArray[0]}`
                    operandArray.shift()
                } else {
                    final += ` ${solution}`
                }
            }
        }
    
        console.log('Final answer: ' + final.bold.trim())
    } else if (answerArray.length === 1) {
        console.log(`Final answer: ${answerArray[0].bold}`)
    }

}