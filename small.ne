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
    |  return_sta {% id %}
    |  if {% id %}
    |  if_else {% id %}
    
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

if_else
        -> if %NL "else" __ "{" %NL statements %NL "}" 
        {%
                (data) => {
                        return{
                                type: "if_else_statement",
                                body: {
                                        ifstatement: data[0],
                                        elsestatement: {
                                                type: "else_statement",
                                                body: data[6]
                                        }
                                }
                                
                        }
                } 
         %}

if -> "if" __ condition __ "{" %NL statements %NL "}"
{% 
(data) => {
        return{
                type: "if_statement",
                condition: data[2],
                body: data[6]
        }
}
 %}



condition -> expr __ comp_opr __ expr{%
        (data) => {
                return{
                        left_value: data[0],
                        opr: data[2],
                        right_value: data[4]
                }
        }
%}
| condition __ and_or __ condition{%
        (data) => {
                return{
                        left_value: data[0],
                        and_or_opr: data[2],
                        right_value: data[4]
                }
        }
%}

comp_opr
        -> ">" {% id %}
        |  "<" {% id %}
        |  "==" {% id %}
        |  "===" {% id %}
        |  ">=" {% id %}
        |  "<=" {% id %}

and_or
      ->"or" {% id %}
       | "and" {% id %}

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
        | _ "return" __ return_sta 
        {% 
                (data) => {
                        
                        return {
                                type: "return",
                                tbr: data[3]}
                }
         %}

return_sta 
        -> expr {% 
        (data) => {
                return [data[0]]
        }
         %} 
        | expr __ return_sta 
        {% 
        (data) => {
                return [data[0], ...data[2]]
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