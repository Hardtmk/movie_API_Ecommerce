const express = require('express')
const router = express.Router() 
const fs = require("fs");

const Product = require('../models/product')
const {
 getAllmovies
} = require('../controllers/products.js')
const {
handlePayment
} = require('../controllers/payment.js')

router.route('/').get(getAllmovies).post(handlePayment)

module.exports=router