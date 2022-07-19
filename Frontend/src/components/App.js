import './App.css';

import {Buffer} from 'buffer';
import {useState } from "react";
Buffer.from('anything','base64');

const App = () => {
  
  const [INRCAmount, setINRCAmount] = useState(null);
  const [appUSDC, setAppUSDC] = useState(null);

  const USDTAddress = "0x11dcD55A4232ffadcc1ec705EAc2245DF4d89C51";
  const INRCAddress = "0x849369cCcea51cF286798aEdcb9A1e34C628E296";
  
  const [account, setAccount] = useState(null)
  var c = "";
 
  // MetaMask Login/Connect
   const web3Handler = async () => {
    c = "Connected account ="
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    //web3 = await getWeb3();
    
    //console.log(web3);
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })

  }

    
//Approve USDC
const approveUSDC = async (e) => {
    e.preventDefault();
    try {          
      
const options = {
	method: 'POST',
        headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ _USDTAddress: USDTAddress,_account: account,_toAddress:INRCAddress,_appAmount:appUSDC}),
    };
var res;
const url1 = new URL("http://localhost:4000/encodeApprove")
	await fetch(url1,options)
	.then(response=>response.json())
	.then(json=> res=json );

      //Deploy the smart contract which required user approval in metamask
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [res.encodedData],
      }).then((result) => {
    
        // The result varies by by RPC method.
        // For example, this method will return a transaction hash hexadecimal string on success.
    
        console.log(`Transaction Result ${result}`)
    
    
      })
      .catch((error) => {
        // If the request fails, the Promise will reject with an error.
    
        console.log(`Transaction ERROR :  ${error.message}`)
      });
    }
      catch (error) {
        console.log(error.message);
      }
    };
  

//Mint INRC for USDC
const mintINRC = async (e) => {
    e.preventDefault();
    try
 {
    const options1 = {
      method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _INRCAddress: INRCAddress,_account: account,_USDCAmount:appUSDC}),
        };

        var res1;
const url1 = new URL("http://localhost:4000/encodeMint")
	await fetch(url1,options1)
	.then(response=>response.json())
	.then(json=> res1=json );
  console.log(res1);
  
  // txHash is a hex string
  // As with any RPC call, it may throw an error
  await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [res1.encodedData],
  }).then((result) => {

    // The result varies by by RPC method.
    // For example, this method will return a transaction hash hexadecimal string on success.

    console.log(`Transaction Result ${result}`)


  })
  .catch((error) => {
    // If the request fails, the Promise will reject with an error.

    console.log(`Transaction ERROR :  ${error.message}`)
  });

}

catch (error) {
  console.log(error.message);
}
};

//Redeem USDC
const redeem = async (e) => {
  e.preventDefault();
 try
 {
  console.log(INRCAddress,INRCAmount,account);
  const options1 = {
    method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _INRCAddress: INRCAddress,_account: account,_INRCAmount:INRCAmount}),
      };

      var res1;
const url1 = new URL("http://localhost:4000/encodeRedeem")
await fetch(url1,options1)
.then(response=>response.json())
.then(json=> res1=json );
console.log(res1);


await window.ethereum.request({
  method: 'eth_sendTransaction',
  params: [res1.encodedData],
  
}).then((result) => {

  console.log(`Transaction Result ${result}`)

})
.catch((error) => {
 
  console.log(`Transaction ERROR :  ${error.message}`)
});

}
catch (error) {
  console.log(error.message);
}
};
 
  return (
    <div className="App">
       <br></br><br></br>
      
      <header > <h1> Mint and Redeem INRC Token </h1></header>
    
      <div className="Wallet">
      <br></br><br></br> 
        <button onClick={web3Handler} variant="outline-light">Connect Wallet</button>
        <p>{account}</p>
   
      </div>     
      
      <div className="main">
      <form > 
      <br></br>
      <header > <h1> Mint INRC Token </h1></header>
      
          <label for="fname">Enter USDC amount to mint INRC </label> <br></br><br></br>
          <input type="number" value={appUSDC} id="fname4" name="fname4" onChange={(e) => setAppUSDC(e.target.value)}/> <br></br><br></br>
          <button type="button" onClick={approveUSDC}>Approve to Transfer USDC</button><br></br><br></br>
          <button type="button" onClick={mintINRC}>Mint INRC</button>

          <form > 
       <br></br><br></br> 
       <header > <h1> Redeem INRC Token </h1></header>
          <label for="fname">Enter INRC amount to Redeem USTC </label> <br></br>
          <input type="number" value={INRCAmount} id="fname4" name="fname4" onChange={(e) => setINRCAmount(e.target.value)}/> <br></br><br></br>
          <button type="button" onClick={redeem}>Redeem INRC</button>

    
          
       </form>


              
       </form>
       
      </div>
  </div>
  
  )
}
export default App;
