const moo = require('moo')
const fs = require('fs/promises')
const os = require('os')
let newLine = {}


if(os.platform() === 'win32'){
    newLine = { match: /[\r\n]+/, lineBreaks: true }
}
else{
    newLine =  { match: /\n/, lineBreaks: true }
}

let lexer = moo.compile({
    WS:      /[ \t]+/,
    comment: /\/\/.*?$/,
    number:  {match:/0|[1-9][0-9]*/, value: n => Number(n)},
    string:  /"(?:\\["\\]|[^\n"\\])*"/,
    lparen:  '(',
    rparen:  ')',
    lbrace:  '{',
    rbrace:  '}',
    lbrack:  '[',
    rbrack:  ']',
    identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
    fatarrow: '=>',
    assign: '=',
    NL:  newLine,
    true: {match: 'true', value: n => true},
    false: {match: 'false', value: n => false},
    comma: ',',
    kind: "mut",
    function: 'fn',
    if: 'if',
    else: 'else',
    elif: 'elif'
  })

lexer.reset(`name = () => {
    print("Hello")
}`)

function tokens(){
    while (true) {
        const token = lexer.next()
        if(!token){
            break;
        }
        console.log(token); 
    }
}
module.exports = lexer;