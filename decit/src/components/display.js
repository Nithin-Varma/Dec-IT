import {useState, useEffect} from "react";
import "./display.css";
const Display = ({contract, account, provider}) => {

    const [data, setdata] = useState("")

    const getdata = () => {

    }

    return (
        <>
        <div className="image-list">Image Display</div> 
        <input type="text" placeholder="Enter Address" className="address"></input>

        <button className="center button" onClick={getdata}>
            Get Data
        </button>
        </>

    )
}

export default Display;