require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const fileRoutes=require("./routes/fileRoutes");
const main=require("./db");

const app=express();
const port=process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));
app.use("/api",fileRoutes);


app.listen(port,()=>{
    console.log("Server listening on port 8080");
    main(process.env.MONGO_URI);
});