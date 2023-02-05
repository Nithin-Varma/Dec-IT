import {useState, useEffect} from "react"
import axios from "axios";
import "./file.css";
const File = ({contract, account, provider}) => {

    const [file1, setfile1] = useState(null);
    const [filename, setfilename] = useState("No file Selected");
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(file1) {
            try {
                const formData = new FormData();
                formData.append("file", file1);

                const resfile = await axios({
                    method: "post",
                    url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `6a9af9af705b7954724f`,
                        pinata_secret_api_key: `75de3671826e31722a0637009df193441f0cb4f6b8a520a718058507ad0329c0`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                const ImgHash = `ipfs://${resfile.data.IpfsHash}`;
                contract.add(account,ImgHash)
                console.log(ImgHash);
                alert("Uploaded Successfully");
                setfilename("No file Selected");
                setfile1(null)


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
            setfile1(e.target.files[0]);
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
        <button type="submit" className="upload" disabled={!file1}>Upload</button>
    </form>
    </div>
    )
}
export default File;