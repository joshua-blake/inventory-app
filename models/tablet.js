var mongoose = require('mongoose')
const TabletSchema = new mongoose.Schema({
  model : {type : String, required : true, minlength : 3},
  brand : {type : String, required : true, minlength : 1},
  value : {type : Number, required : true, minlength : 1},
  quantity : {type : Number, required : true, minlength : 1}
})
TabletSchema
.virtual('url')
.get(function(){
  return '/tablet/view/' + this._id;
})
module.exports = mongoose.model('Tablet', TabletSchema)