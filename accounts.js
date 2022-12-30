const { ethers } = require("ethers");
const env = require('dotenv').config();

const RPC = process.env.RPC;
const account1 = process.env.PUBLIC_KEY;
const privateKey = process.env.KEY;
// console.log(RPC, account, privateKey);

const provider = new ethers.providers.JsonRpcProvider(RPC);           // blockchain ma bhako sab data pauxa 

const account = new ethers.Wallet(privateKey, provider);              //


async function call() {
    const bal = await provider.getBalance(account1);
    console.log("account1 balance:", ethers.utils.formatEther(bal));                         // balance ether format ma pauxa, default is wei


    console.log(ethers.utils.formatEther(await account.getBalance()));                           // gas price pauxa
    console.log(account.getAddress());                                   // public address address pauxa


    // balance send garna private key bhako account le matra milxa ans sufficient balance hunu parxa, else error aauxa

    const trans = await account.sendTransaction(                  // sending balance from account to account1
        {
            to: account1,
            value: ethers.utils.parseEther("0.00001")
        }
    )

    await trans.wait();         // wait until transaction is confirmed

    console.log("account1 balance:", ethers.utils.formatEther(bal));
    console.log("account balance:", ethers.utils.formatEther(await account.getBalance()));


}

call();

