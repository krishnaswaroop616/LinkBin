import React, { useState } from 'react';
import axios from "axios";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied,setCopied]=useState(false);

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!file) {
            alert("Please select a file");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("file", file);


        try {
            const res = await axios.post("http://localhost:8080/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResponse(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            alert("Upload failed");
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="card shadow p-4 w-100" style={{ maxWidth: "500px" }}>
                <h3 className="mb-4 text-center fw-bolder fs-2">Upload a File</h3>
                <form onSubmit={handleUpload}>
                    <div className="mb-4 mt-2">
                        <input type="file" className="form-control" id="fileInput" onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" ></span>
                                Uploading...
                            </>
                        ) : "Upload"}
                    </button>
                </form>

                {response && (
                    <div className="alert alert-success mt-4" role="alert">
                        
                        <a href={response.downloadLink} className="d-block mt-2  link-underline link-underline-opacity-0 link-underline-opacity-50-hover"><b>Click here to download</b></a>
                        <button className="btn btn-outline-primary btn-sm mt-3" onClick={() => {navigator.clipboard.writeText(response.downloadLink);setCopied(true)}}>
                            Copy Link
                        </button>
                        {copied?<span className='align-middle'><i class="fa-solid fa-circle-check mx-2 mt-3"></i></span>:<></>}
                    </div>
                )}
            </div>
        </div>
    );
}


export default UploadForm;