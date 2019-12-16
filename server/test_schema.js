var mongoose = require('mongoose');


var test_schema = mongoose.Schema({
    fname: {type:String,required:true},
    lname: {type:String,required:true}
});

var testModel = mongoose.model('member',test_schema) //สร้าง collection

module.exports = testModel;