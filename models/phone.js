var mongoose = require('mongoose');
const PhoneSchema = new mongoose.Schema({
  model : {type : String, required : true, minlength : 3},
  brand : {type : String, required : true, minlength : 1},
  value : {type : Number, required : true, minlength : 1},
  quantity : {type : Number, required : true, minlength : 1}
})
PhoneSchema
.virtual('url')
.get(function(){
  return '/phone/view/' + this._id;
})
module.exports = mongoose.model('Phone', PhoneSchema)