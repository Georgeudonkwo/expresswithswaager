const {mongoose,_}=require('./mongoose-setup');
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    department:{
        type:String,
        require:true
    },
    gradepoint:{
        type:Number,
        require:true,
        validate:{
            validator:function(value){
               return value>0 && value<=5
            }
        }
    }
})

const student=mongoose.model("student",studentSchema);
module.exports=student;