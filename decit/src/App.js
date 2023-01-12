import Dec_File from "./artifacts/contracts/Dec_File.sol/Dec_File.json";
import {useState, useEffect} from "react";
import {ethers} from "ethers";
import File from "./components/file.js";
import modal from "./components/modal.js";
import display from "./components/display.js";

import './App.css';

function App() {

  const[account, setaccount] = useState("");
  const[contract, setcontract] = useState(null);
  const[provider, setprovider] = useState(null);
  const[modal, setmodal] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadprovider = async() => {
      if(provider){

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setaccount(address);

        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Dec_File.abi,
          signer
        )
        console.log(contract);
        setcontract(contract);
        setprovider(provider);
      }
      else {
        console.log("please connect to your Metamask.");
      }
    }
    provider && loadprovider()
  },[])
  return (
    <div className="App">
      <h1>Dec-IT</h1>
      <h3>A Decentralized File System</h3>
      <p>Account: {account ? account: "Not Connected"}</p>
      <File account={account}
            provider={provider}
            contract = {contract}>
            
            </File>
     </div>
  );
}

export default App;
