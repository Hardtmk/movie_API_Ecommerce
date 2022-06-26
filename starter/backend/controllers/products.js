// 一定要跟模板的名字一樣
const Product = require('../models/product')

const getAllmovies=async(req,res)=>{ 

    console.log(JSON.stringify(req.body))
  const { title,price,release_date,vote_average,adult,sort,fields,numericFilters} = req.query


  const queryObject={}
  if(adult){
   queryObject.adult=adult ==='true'? true : false;
  }



 if(title){
 queryObject.title= { $regex: title, $options: 'i' };
}

if(release_date){


  const operatorMap={
    '>':'$gt',
    '>=':'$gte',
    '=':'$eq',
    '<':'$lt',
    '<=':'$lte'
  }

  const regEx =/\b(<|>|>=|=|<|<=)\b/g

let filters = release_date.replace(
  regEx,
  (match)=>`,${operatorMap[match]},`
)
console.log(filters)
const options =['release_date']

const [field,operator,value,second,secondValue] = filters.split(',');
if(options.includes(field)){

    const dates = new Date(value);
    const dates2 = new Date(secondValue);
    console.log('dates'+dates)
    console.log('date2='+dates2)

    if(second&&secondValue){
  queryObject[field]={[operator]:(dates),[second]:(dates2)}
    }else{
        queryObject[field]={[operator]:(dates)}
    }
}

}


 if(numericFilters){

  const operatorMap={
'>':'$gt',
'>=':'$gte',
'=':'$eq',
'<':'$lt',
'<=':'$lte',
 }
 const regEx=/\b(<|>|>=|=|<|<=)\b/g
let filters = numericFilters.replace(
 regEx,
 (match)=>`-${operatorMap[match]}-`
)

const options =['vote_average','price'];
filters = filters.split(',').forEach((item)=>{
  const arr=item.split('-')
  const [field,operator,value,second,secondValue] = item.split('-')

  if(options.includes(field)){

    if(second&&secondValue){

    
    queryObject[field]={[operator]:Number(value),[second]:Number(secondValue)}
    }else{
        queryObject[field]={[operator]:Number(value)}
    }
  }
})
 }
 
 console.log(queryObject)
let result = Product.find(queryObject)

if(sort){
 const sortList=sort.split(',').join(' ')
 console.log('sortList='+sortList)
 result = result.sort(sortList)
}else{
 result = result.sort('release_date')
}

if(fields){
 const fieldsList=fields.split(',').join(' ')
 result= result.select(fieldsList)
}

const page = Number(req.query.page)||1;
const limit = Number(req.query.limit)||20;
const skip = (page-1)*limit;

result = result.skip(skip).limit(limit);


  let movies = await result
 res.status(200).json({movies,nbHits:movies.length})
}


module.exports={
 getAllmovies,
}