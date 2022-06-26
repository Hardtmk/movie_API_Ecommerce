//  const regEx=/\b(<|>|>=|=|<|<=)\b/g
// let filters = numericFilters.replace(
//  regEx,
//  (match)=>`-${operatorMap[match]}-`
// )

//   const operatorMap={
// '>':'$gt',
// '>=':'$gte',
// '=':'$eq',
// '<':'$lt',
// '<=':'$lte',
  
//  }

 // const regEx=/\b(<|>|>=|=|<|<=)\b/g
const CHinEng={
 '一':'one',
 '二':'two',
 '三':'three',
}
const numericFilters='一'
console.log(numericFilters)
// 難道說只能一次性更改一次嗎
// 請注意這裏是沒有用到filter function的
let filters = numericFilters.replace('一',
(match)=>`${CHinEng[match]}`)
console.log(filters)


const 孫悟空={
 'name':'孫悟空'
}
const john={

}

console.log(孫悟空['name'])



john.family={wife:'kitty'}


console.log(john[family])
