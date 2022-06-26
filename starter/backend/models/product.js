

const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
  title: {
    type: String,
   
  },
  overview:{
   type:String
  },
  price: {
    type: Number,
  },

 poster_path: {
    type: String,
  },
backdrop_path: {
    data: Buffer,
  contentType: String
  },
 release_date: {
    type: Date
  },
  vote_average: {
    type: Number
  },
  adult: {
    type: Boolean
  },
  original_language: {
    type: String,
  },
})

module.exports = mongoose.model('Product', productSchema)

