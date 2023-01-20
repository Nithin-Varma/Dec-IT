import {useState, useEffect} from "react"
import axios from "axios";
import "./file.css";
const File = ({contract, account, provider}) => {

    const [file, setfile] = useState(null);
    const [filename, setfilename] = useState("No file Selected");
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const resfile = await axios({
                    method: "post",
                    url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `fed8d2362a1d40026b12`,
                        pinata_secret_api_key: `70fd5e9072f82ce9755d6bc111be0cb803afe39c7d08eee6351f57d6d9abe9fc`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                const ImgHash = `ipfs://${resfile.data.IpfsHash}`;
                contract.add(account,ImgHash)
                alert("Uploaded Successfully");
                setfilename("No file Selected");
                setfile(null)


            }
            catch(error) {
                alert("error while uploading image.", error)
            }
        }

    }

    const retrievefile = (e) => {
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setfile(e.target.files[0]);
        }

        setfilename(e.target.files[0].name);
        e.preventDefault();
    }

    return (
        <div className="top">
    <form className = "form" onSubmit = {handleSubmit}>
        <label htmlFor="file-upload" className="choose">
            Choose Image
        </label>

        <input disabled={!account} type="file" id="file-upload" name = "data" onChange={retrievefile}/>

        <span className="textArea">" {filename} " </span><br/><br/><br/>
        <button type="submit" className="upload" disabled={!file}>Upload</button>
    </form>
    </div>
    )
}
export default File;