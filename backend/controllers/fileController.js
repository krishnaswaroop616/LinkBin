const File = require("../models/File");
const path = require("path");

const uploadFile = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const file = new File({
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        cloudinary_id: req.file.filename
    });

    await file.save();
    res.status(200).json({ message: "File uploaded", fileId: file._id, downloadLink: `http://localhost:8080/api/file/${file._id}` });
}


const downloadFile = async (req, res) => {
    const { id } = req.params;
    try {
        const file = await File.findById(id);
        if (!file) {
            return res.status(400).json({ message: "File not found" });
        }
        const downloadUrl = file.path.replace("/upload/", "/upload/fl_attachment/");
        res.redirect(downloadUrl);
    }
    catch (err) {
        res.status(500).json({ message: "Error downlaoding file", error: err });
    }
}

module.exports = { uploadFile, downloadFile };