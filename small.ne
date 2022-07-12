@{%
const myLexer = require("./lexer");
%}

@lexer myLexer

#Support For Next Line
statements
        ->  statements %NL _ statement _ {% 
                (data) => {
                        return [...data[0], data[3]]
                }
        %} | _ statement _ {% 
                (data) =>{
                        return [data[1]]
                }
         %}

statement
    -> var_assign{% id %}
    |  fun_call {% id %}
    |  fun_dec {% id %}
    
var_assign
    ->"mut" _ %identifier _ %assign _ expr {% 
    (data) => {
        return{ 
                type: "var_assign",
                var_name: data[2],
                value: data[6],
                kind: "let"
        }
    }
     %}
     |  %identifier _ %assign _ expr {% 
     (data) => {
        return{ 
                type: "var_assign",
                var_name: data[0],
                value: data[4],
                kind: "const"
        }
     }
      %}

fun_dec
        -> "fn" __ %identifier _ "(" _ param_list _ ")" "{" %NL fun_body %NL "}"
        {% 
        (data) => {
                return{
                        type: "fun_dec",
                        fun_name: data[2],
                        params: data[6],
                        body: data[11]
                }
        }
         %}

fun_body
        ->_ expr _{% 
        (data) => {
                return [data[1]]
        }
         %}
        | "{"  %NL _ statements _ %NL  "}"
        {% 
                (data) =>{
                        return data[3]
                }
        %}


param_list
        ->
        %identifier
        {%
                (data) => {
                        return [data[0]]
                }
        %}
        |param_list __ %identifier
        {% 
        (data) => {
                return [...data[0], data[2]]
        }
         %}
        |null {% 
        (data) => {
                return []
        }
         %}

arg_list -> expr
        {% 
        (data) => {
                return [data[0]]
        }
         %} 
        | null {% 
        (data)=> {
                return []
        }
         %}
        |  arg_list __ expr
        {%
            (data) => {
                return [...data[0], data[2]];
            }
        %}


fun_call 
        -> %identifier _ "(" _ arg_list _ ")" 
        {% 
        (data) => {
                return{
                        type: "fun_call",
                        fun_name: data[0],
                        arguments: data[4]
                }
        }
         %} 

arg_list
        -> expr
        {% 
        (data) => {
                return [data[0]]
        }
         %} 
        | null {% 
        (data)=> {
                return []
        }
         %}
        |  arg_list __ expr {%
        (data) => {
                return [...data[0], data[2]]
        }
         %}

expr
    -> %string     {% id %}
    |  %number     {% id %}
    |  %identifier {% id %}
    |  boolean     {% id %}
    |  array       {% id %}
    |  fun_call    {% id %}

boolean -> %true | %false

array -> "[" array_items "]" {% 
        (data) => {
                return{
                        type: "Array",
                        value: data[1].map((l)=>{
                                return l.value
                        })
                }
        }
 %} | "[" "]"

array_items -> value {% 
        (data) =>{
                return [data[0]]
        }
 %} | value _ "," _ array_items {% 
        (data)=>{
                return [data[0],...data[4]]
        }
 %}

value
        -> %string     {% id %}
        |  %number     {% id %}
        |  %identifier {% id %}
        |  boolean     {% id %}



# Optional whitespace    
_ -> %WS:* {% id %}

# Mandatory whitespace
__ -> %WS:+ {% id %}