let mongoose = require('mongoose')
let Schema = mongoose.Schema

let statSchema = new Schema({
    "orderId": String,
    "orderTotal": String,
    "userId": String,
    "userName": String,
    'createDate': String,
    'isPay': String,
})

module.exports = mongoose.model('Stat', statSchema)