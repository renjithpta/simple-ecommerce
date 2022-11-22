import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const LoyaltyDataManagerContract = require('../abis/LoyaltyDataManager.json');
const LoyaltyToken = require('../abis/LoyaltyToken.json');
require('dotenv').config();
const address = process.env.OWNER_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const infuraUrl = "http://localhost:7545";


const registerCustomer = async (email) => {

  const web3 = new Web3(infuraUrl);
  const networkId = await web3.eth.net.getId();
  const loyaltyDataManagerContract = new web3.eth.Contract(
    LoyaltyDataManagerContract.abi,
    LoyaltyDataManagerContract.networks[networkId].address
  );
  const tx = await loyaltyDataManagerContract.methods.registerCustomer(email);
  const gas = await tx.estimateGas({ from: address });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(address);
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: loyaltyDataManagerContract.options.address,
      data,
      gas,
      gasPrice,
      nonce,
      chainId: networkId
    },
    privateKey
  );
  console.log(signedTx)
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  return { Message: "User registered successfully!", hash: receipt };
}

const getCustomerDetails = async (email) => {

  const web3 = new Web3(infuraUrl);
  const networkId = await web3.eth.net.getId();
  const loyaltyDataManagerContract = new web3.eth.Contract(
    LoyaltyDataManagerContract.abi,
    LoyaltyDataManagerContract.networks[networkId].address
  );
  console.log("====before====")
  let result = await loyaltyDataManagerContract.methods.getCustomerDetails(email).call({ from: address });

  console.log("====after====")
  return { 'username': result[0], totalReward: result[1], totalRedeem: result[2], balance: result[3] };
}

const getTokenbasicDetails = async () => {

  const web3 = new Web3(infuraUrl);
  const networkId = await web3.eth.net.getId();
  const toeknContract = new web3.eth.Contract(
    LoyaltyToken.abi,
    LoyaltyToken.networks[networkId].address
  );
  const name = await toeknContract.methods.name().call({ from: address });
  const symbol = await toeknContract.methods.symbol().call({ from: address });
  const total = await toeknContract.methods.totalSupply().call({ from: address });
  console.log(`Token name: ${name} & Symbol: ${symbol}`);

  return { name, symbol, total };
}


const newRule = async (dollarAmt, rate) => {

  const web3 = new Web3(infuraUrl);
  const networkId = await web3.eth.net.getId();
  const loyaltyDataManagerContract = new web3.eth.Contract(
    LoyaltyDataManagerContract.abi,
    LoyaltyDataManagerContract.networks[networkId].address
  );
  const tx = await loyaltyDataManagerContract.methods.addRule(dollarAmt, rate);
  const gas = await tx.estimateGas({ from: address });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(address);
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: loyaltyDataManagerContract.options.address,
      data,
      gas,
      gasPrice,
      nonce,
      chainId: networkId
    },
    privateKey
  );
  console.log(signedTx)

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  return { Message: "New rule added successfully!", hash: receipt, logs: receipt.logs };
}

const rewardToken = async (userName, ruleId, txAmount) => {
  const web3 = new Web3(infuraUrl);
  const networkId = await web3.eth.net.getId();
  const loyaltyDataManagerContract = new web3.eth.Contract(
    LoyaltyDataManagerContract.abi,
    LoyaltyDataManagerContract.networks[networkId].address
  );
  const tx = await loyaltyDataManagerContract.methods.applyAwardRule(userName, ruleId, txAmount);
  const gas = await tx.estimateGas({ from: address });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(address);
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: loyaltyDataManagerContract.options.address,
      data,
      gas,
      gasPrice,
      nonce,
      chainId: networkId
    },
    privateKey
  );
  console.log(signedTx)

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(`Transaction hash: ${receipt.transactionHash}`);

  return { Message: "Token reward added successfully!", hash: receipt };

}

getCustomerDetails('jane@example.com')

export { getCustomerDetails, registerCustomer, newRule, rewardToken, getTokenbasicDetails };
