const { ethers } = require("ethers");
const transfer = require('./transfer.json');
const env = require('dotenv').config();

const RPC = process.env.RPC;
const account1 = process.env.PUBLIC_KEY;
const privateKey = process.env.KEY;
const provider = new ethers.providers.JsonRpcProvider(RPC);           // blockchain ma bhako sab data pauxa 

const wallet = new ethers.Wallet(privateKey, provider);              //

const contractAddress = '0x9f9Da5042517431A20d714BC2E9c1370975cd979';            // transaction hash
const ABI = transfer.abi;

async function call() {
    const contract = new ethers.Contract(
        contractAddress,
        ABI,
        // provider          // read only
        wallet            // read and write. wallet is used to sign the transaction
    )

    console.log(`${account1}: ${ethers.utils.formatEther(await provider.getBalance(account1))}}`);

    console.log(`${await wallet.getAddress()}: ${ethers.utils.formatEther(await wallet.getBalance())}}`);


    const tx = await contract._transfer(account1, {               // sending balance from account to account1
        value: ethers.utils.parseEther("0.001")
    })

    await tx.wait();         // wait until transaction is confirmed

    console.log(`${account1}: ${ethers.utils.formatEther(await provider.getBalance(account1))}}`);

    console.log(`${await wallet.getAddress()}: ${ethers.utils.formatEther(await wallet.getBalance())}}`);

    console.log(tx)
}

call()
