const express=require("express");
const multer=require("multer");
const path=require("path");
const {storage}=require("../cloudConfig");
const {downloadFile, uploadFile}=require("../controllers/fileController");

const router=express.Router();

const upload =multer({storage});    

router.post("/upload",upload.single('file'),uploadFile);
router.get("/file/:id",downloadFile);


module.exports=router;