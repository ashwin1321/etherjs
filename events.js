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

    // const trans = contract.filters.transactions(null, 0.01);   // filter the transaction   
    // const transactions = await contract.queryFilter(trans)           // get all filtered transactions

    const transactions = await contract.queryFilter('transactions')           // get all transactions from contract events

    // const block = await provider.getBlockNumber();           // get latest block number
    // const transactions = await contract.queryFilter('transactions', block - 4, block)           // get transaction from certain block number to latest block number


    // console.log(transactions);
    transactions.map((item) => {
        console.log(item.args.to, ":", ethers.utils.formatEther(item.args.amount))  // print all transactions 
    })

}

call()
