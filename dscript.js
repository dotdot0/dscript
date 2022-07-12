// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const myLexer = require("./lexer");
var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "statements", "symbols": ["statements", (myLexer.has("NL") ? {type: "NL"} : NL), "_", "statement", "_"], "postprocess":  
        (data) => {
                return [...data[0], data[3]]
        }
                },
    {"name": "statements", "symbols": ["_", "statement", "_"], "postprocess":  
        (data) =>{
                return [data[1]]
        }
                 },
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["fun_call"], "postprocess": id},
    {"name": "statement", "symbols": ["fun_dec"], "postprocess": id},
    {"name": "var_assign", "symbols": [{"literal":"mut"}, "_", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", (myLexer.has("assign") ? {type: "assign"} : assign), "_", "expr"], "postprocess":  
        (data) => {
            return{ 
                    type: "var_assign",
                    var_name: data[2],
                    value: data[6],
                    kind: "let"
            }
        }
         },
    {"name": "var_assign", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", (myLexer.has("assign") ? {type: "assign"} : assign), "_", "expr"], "postprocess":  
        (data) => {
           return{ 
                   type: "var_assign",
                   var_name: data[0],
                   value: data[4],
                   kind: "const"
           }
        }
         },
    {"name": "fun_dec", "symbols": [{"literal":"fn"}, "__", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "param_list", "_", {"literal":")"}, {"literal":"{"}, (myLexer.has("NL") ? {type: "NL"} : NL), "fun_body", (myLexer.has("NL") ? {type: "NL"} : NL), {"literal":"}"}], "postprocess":  
        (data) => {
                return{
                        type: "fun_dec",
                        fun_name: data[2],
                        params: data[6],
                        body: data[11]
                }
        }
         },
    {"name": "fun_body", "symbols": ["_", "expr", "_"], "postprocess":  
        (data) => {
                return [data[1]]
        }
         },
    {"name": "fun_body", "symbols": [{"literal":"{"}, (myLexer.has("NL") ? {type: "NL"} : NL), "_", "statements", "_", (myLexer.has("NL") ? {type: "NL"} : NL), {"literal":"}"}], "postprocess":  
        (data) =>{
                return data[3]
        }
                },
    {"name": "param_list", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": 
        (data) => {
                return [data[0]]
        }
                },
    {"name": "param_list", "symbols": ["param_list", "__", (myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess":  
        (data) => {
                return [...data[0], data[2]]
        }
         },
    {"name": "param_list", "symbols": [], "postprocess":  
        (data) => {
                return []
        }
         },
    {"name": "arg_list", "symbols": ["expr"], "postprocess":  
        (data) => {
                return [data[0]]
        }
         },
    {"name": "arg_list", "symbols": [], "postprocess":  
        (data)=> {
                return []
        }
         },
    {"name": "arg_list", "symbols": ["arg_list", "__", "expr"], "postprocess": 
        (data) => {
            return [...data[0], data[2]];
        }
                },
    {"name": "fun_call", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "arg_list", "_", {"literal":")"}], "postprocess":  
        (data) => {
                return{
                        type: "fun_call",
                        fun_name: data[0],
                        arguments: data[4]
                }
        }
         },
    {"name": "arg_list", "symbols": ["expr"], "postprocess":  
        (data) => {
                return [data[0]]
        }
         },
    {"name": "arg_list", "symbols": [], "postprocess":  
        (data)=> {
                return []
        }
         },
    {"name": "arg_list", "symbols": ["arg_list", "__", "expr"], "postprocess": 
        (data) => {
                return [...data[0], data[2]]
        }
         },
    {"name": "expr", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expr", "symbols": ["boolean"], "postprocess": id},
    {"name": "expr", "symbols": ["array"], "postprocess": id},
    {"name": "expr", "symbols": ["fun_call"], "postprocess": id},
    {"name": "boolean", "symbols": [(myLexer.has("true") ? {type: "true"} : true)]},
    {"name": "boolean", "symbols": [(myLexer.has("false") ? {type: "false"} : false)]},
    {"name": "array", "symbols": [{"literal":"["}, "array_items", {"literal":"]"}], "postprocess":  
        (data) => {
                return{
                        type: "Array",
                        value: data[1].map((l)=>{
                                return l.value
                        })
                }
        }
         },
    {"name": "array", "symbols": [{"literal":"["}, {"literal":"]"}]},
    {"name": "array_items", "symbols": ["value"], "postprocess":  
        (data) =>{
                return [data[0]]
        }
         },
    {"name": "array_items", "symbols": ["value", "_", {"literal":","}, "_", "array_items"], "postprocess":  
        (data)=>{
                return [data[0],...data[4]]
        }
         },
    {"name": "value", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "value", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "value", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "value", "symbols": ["boolean"], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (myLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": id},
    {"name": "__$ebnf$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (myLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": id}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
