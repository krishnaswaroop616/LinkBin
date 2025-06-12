const mongoose=require("mongoose");

const fileSchema=new mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    cloudinary_id:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:24*60*60
    }
});


const File=mongoose.model("File",fileSchema);

module.exports=File;