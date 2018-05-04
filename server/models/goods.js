let mongoose = require('mongoose')
let Schema = mongoose.Schema

let productSchema = new Schema({
    "productId": String,
    "productName": String,
    "salePrice": Number,
    "productImage": String
})

module.exports = mongoose.model('Good', productSchema)