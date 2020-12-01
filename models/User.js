const mongoose=require("mongoose");

var userSchema=mongoose.Schema({
    iud:    String,
    token:  String, 
    email:  String,
    name:   String,
    gender: String,
    pic:    String
});

module.exports=mongoose.model('User', userSchema);