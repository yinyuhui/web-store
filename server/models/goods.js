let mongoose = require('mongoose')
let Schema = mongoose.Schema

let productSchema = new Schema({
    "productId": String,
    "productName": String,
    "salePrice": Number,
    "productImage": String,
    'productNum': Number,
    'checked': Number,
    'describe': String,
    'classify': String,
    'describeImg': String,
    'hasPayNum': Number,
    'hasOrderNum': Number
})

module.exports = mongoose.model('Good', productSchema)