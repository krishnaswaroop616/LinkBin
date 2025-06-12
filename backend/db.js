const mongoose=require("mongoose");

async function main(url) {
    await mongoose.connect(url);
    console.log("db connected");
}

module.exports=main;