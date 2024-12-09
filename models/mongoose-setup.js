const mongoose=require('mongoose');
const url="mongodb://localhost:27017/etidb";
const dbconnection=mongoose.connect(url);

module.exports={mongoose,dbconnection};