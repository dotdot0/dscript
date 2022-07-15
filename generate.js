const fs = require('fs/promises');
const os = require('os')
let newLine = ''

//New Line For Different OS
if(os.platform() === 'win32'){
    newLine = '\n'
}
else{
    newLine = '/n'
}


async function main(){
    const filename = process.argv[2]
    
    if(!filename){
        console.log("Please Provide An .ast file")
        return;
    }
    const astJson = (await fs.readFile(filename)).toString()
    const ast = JSON.parse(astJson)
    const jsCode = generateForStatements(ast)
    const outputFile = filename.replace(".ast", ".js")
    fs.writeFile(outputFile, jsCode,(err) => {
        if(err) {
            console.log("Unable To Write File");
        }
        else{
            console.log(outputFile + "Written");
        }
    })
}   

//Generate Js Code For Statements 
function generateForStatements(statements){
    const lines = []
    for(let statement of statements){
        const jsCode = generateForStatementAndExpr(statement)
        lines.push(jsCode)
    }
    return lines.join(newLine)
}

//Generate Js Code For Statement And Expressions
function generateForStatementAndExpr(node){
    
    //Variable Assigment
    if(node.type === 'var_assign'){
        //Array
        if(node.value.type === 'Array'){
        
            return `${node.kind} ${node.var_name.value} = [${node.value.value}]`
        }

        //Variable - Function Call
        else if(node.value.type === 'fun_call'){
            const varFunArgs = node.value.arguments.map((el) => {
                return generateForStatementAndExpr(el);
            })
            const funArgsList = varFunArgs.join(",")
            return `${node.kind} ${node.var_name.value} = ${node.value.fun_name.value}(${funArgsList})`
        }  

        //Variable - Data Types
        else{

            return `${node.kind} ${node.var_name.value} = ${node.value.value}`
        }  
        
        }

        //Function Declaration
        else if(node.type === "fun_dec"){
            const funParams = node.params.map((el )=> {
                return el.value
            })
            const funParamsList = funParams.join(",")
            console.log(funParamsList);
            if(node.body.type === "return"){
                const reFunBody = generateForStatements(node.body.tbr)
                return `function ${node.fun_name.value}(${funParamsList}) {
                            return ${reFunBody}
                   }`
            }else{
                const funBody = generateForStatements(node.body)
                // console.log(funBody);
                return `function ${node.fun_name.value}(${funParamsList}) {
                 ${funBody}
                }`
            }
            
        }

        //If Statement
        else if(node.type === "if_statement"){
            const ifBody = generateForStatements(node.body);
            return `if (${node.condition.left_value.value} ${node.condition.opr.value} ${node.condition.right_value.value}){
                ${ifBody}
            }`
        }

        //String
        else if(node.type === "string"){
            return node.value;
        }

        //Number
        else if(node.type === "number"){
            return node.value;
        }

        //Identifier
        else if(node.type === "identifier"){
            return node.value;
        } 

        //Function Call
        if(node.type === 'fun_call'){
            const args = node.arguments.map((el) => {
                return el.value;
            })
            const argsList = args.join(",")
            if(node.fun_name.value === "print"){
                return `console.log(${argsList})`
            }
            return `${node.fun_name.value}(${argsList})`
        }
        
    }


main()