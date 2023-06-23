# nodejs-finance
Sistema de finanças - NodeJS

- Deploy - render.com
- logger - aplicar ao sistema
- Try catch - ver onde não tem
- Destructionoperation - let {name, endereco} = user; Ver onde não uso isto e validar null e empty tbm
- Spreetopertion 
- Em vez de for, use: foreach, finder, map...
*- Nullis coalescing operator: 'sua idade é' + (null ?? 'nao informada')
*- Desestruturacao 
const user = {
    nome: 'marcos',
    idade: 88
}
let {nome, idade} = user

em function tbm
function mostrarIdade({nome, idade}) {
    return idade
}
mostrarIdade(user);

*- Rest operator - retorna o resto menos o nome
const {name, ...rest} = user
console.log(JSON.stringfy(rest))

é possivel pegar tbm em array

*- Option chaining
const user = {
    nome: 'marcos',
    idade: 88,
    detal: {
        sexo: 'M',
        cor: 'B',
        salario: {
            mes: 1000,
            ano: 2000
        }
    }
}
console.log(user.detal?.salario?.mes ?? 'Nao informado' )