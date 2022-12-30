const { ethers } = require("ethers");
const transfer = require('./transfer.json');
const env = require('dotenv').config();

const RPC = process.env.RPC;

const provider = new ethers.providers.JsonRpcProvider(RPC);           // blockchain ma bhako sab data pauxa 

const contractAddress = '0x9f9Da5042517431A20d714BC2E9c1370975cd979';            // transaction hash
const ABI = transfer.abi;

async function call() {
    const contract = new ethers.Contract(
        contractAddress,
        ABI,
        provider
    )

    console.log(`The address of owner is: ${await contract.callOwner()}`);
    // console.log(await contract.owner());

}

call()
