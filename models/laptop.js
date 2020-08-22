var mongoose = require('mongoose')
const LaptopSchema = new mongoose.Schema({
  model : {type : String, required : true, minlength : 3},
  brand : {type : String, required : true, minlength : 1},
  value : {type : Number, required : true, minlength : 1},
  quantity : {type : Number, required : true, minlength : 1}
})
LaptopSchema
.virtual('url')
.get(function(){
  return `/laptop/view/${this._id}`
})
module.exports = mongoose.model('Laptop', LaptopSchema)