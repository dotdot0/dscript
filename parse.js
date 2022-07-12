const nearley = require('nearley')
const grammar = require('./dscript')
const fs = require('fs')

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

const fileName = process.argv[2]

const astFileName = fileName.replace('.ds', '.ast')

const code = fs.readFileSync(fileName).toString()


if(fileName){
    parser.feed(code)
// console.log(parser.results[0]);

const res = parser.results[0]
const ast = JSON.stringify(res,null," ")

fs.writeFile(astFileName,ast, (e) => {
    if(e){
        console.log("Unable To Write File");
    }
    else{
        console.log("ex1.ast written");
    }
})

}
else{
    throw new Error("Please Provide A .ds file")
}
//`

