const Web3 = require('web3');
const web3= new Web3;
const express = require("express");
const router = express.Router();
const USDTAddress = "0x11dcD55A4232ffadcc1ec705EAc2245DF4d89C51";
const INRCAddress = "0x903375ea6F931A189aB3336FA61c2F8f4b446bB8";

const USDCjson = "../USDCjson.json";
const INRCjson = "../INRCjson.json";

module.exports = router;

router.get("/test",  (req, res) => {
    
    return res.send("Hello");
    });

router.post("/in",  (req, res) => {
    console.log(req.body.data);
    return res.send(req.body.data);
        });

router.post("/encodeData",  (req, res) => {
    console.log(req.body);
    const r = req.body;
    const e = web3.eth.abi.encodeParameters(
    ['string','string','string','string','uint64','uint256'],
    [r.data1,r.data2,r.data3,r.data4,r.data5,r.data6]
    );
    return res.send({
        encodedData: e
      });
    });

router.post("/encodeFn", async (req, res) => {
        const weiValue = await web3.utils.toWei(req.body.amt,'wei');
         const network = "0x3";
       const e = {
         to: req.body.NFTAddress, // Required except during contract publications.
         from: req.body.account, // must match user's active address.
         value: weiValue.toString(), 
         data: web3.eth.abi.encodeFunctionCall(    
           {        
               "inputs": [],
               "name": "buyEventTicket",
               "outputs": [],
               "stateMutability": "payable",
               "type": "function"
                    
         },),
         chainId: network , // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
       }; 
       return res.send({
         encodedData: e
       });
     
     });

     router.post("/encodeApprove", async (req, res) => {
        
         const network = "0x3";
       const e = {
         to: req.body._USDTAddress, // Required except during contract publications.
         from: req.body._account, // must match user's active address.
         gasPrice: "0x6FC23AC00", // gas price 30000000000 Wei
         gas: "0x7A1200",  //gas limit 8000000
         data: web3.eth.abi.encodeFunctionCall(    
           {        
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
                    
         },[req.body._toAddress,req.body._appAmount]),
         chainId: network , // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
       }; 
       return res.send({
         encodedData: e
       });
     
     });

     router.post("/encodeMint", async (req, res) => {
       const network = "0x3";
       const e = {
         to: req.body._INRCAddress, // Required except during contract publications.
         from: req.body._account, // must match user's active address.
         gasPrice: "0x6FC23AC00", // gas price 30000000000 Wei
         gas: "0x7A1200",  //gas limit 8000000
         data: web3.eth.abi.encodeFunctionCall(    
           {        
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "mintToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
                    
         },[req.body._USDCAmount]),
         chainId: network , // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
       }; 
       return res.send({
         encodedData: e
       });
     
     });
     
     router.post("/encodeRedeem", async (req, res) => {

        const network = "0x3";
        console.log(req.body._INRCAddress,req.body._account,req.body._INRCAmount)
        const e = {
          to: req.body._INRCAddress, // Required except during contract publications.
          from: req.body._account, // must match user's active address.
          gasPrice: "0x6FC23AC00", // gas price 30000000000 Wei
          gas: "0x7A1200",  //gas limit 8000000
          data: web3.eth.abi.encodeFunctionCall(    
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "RedeemToken",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },[req.body._INRCAmount]),
          chainId: network , // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        }; 
        return res.send({
          encodedData: e
        });
      
      });


      router.post("/USDCBalance", async (req, res) => {
        USDCAddress = req.body._contractAddress;
        const USDCContract = new web3.eth.Contract(USDCjson.abi,USDCAddress);
        balance = await USDCContract.methods.balanceOf(add).call();
        
        return res.send({
          encodedData: balance
        });
      
      });

      router.post("/INRCBalance", async (req, res) => {
        INRCAddress = req.body._contractAddress;
        const INRCContract = new web3.eth.Contract(INRCjson.abi,INRCAddress);
        balance = await INRCContract.methods.balanceOf(add).call();
        
        return res.send({
          encodedData: balance
        });
      
      });
      



