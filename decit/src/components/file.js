import {useState, useEffect} from "react"
import axios from "axios";
const File = ({contract, account, provider}) => {


    const handleSubmit = async() => {

    }

    const retrievefile = () => {

    }

    return (
        <div>
    <form className = "form" onSubmit = {handleSubmit}>
        <label htmlFor="file-upload" className="choose">
            Choose Image
        </label>

        <input disabled={!account} type="file" id="file-upload" name = "data" onChange={retrievefile}/>

        <span>Image: xxxxxxxx</span>
        <button type="submit">Upload</button>
    </form>
    </div>
    )
    
}

export default File;