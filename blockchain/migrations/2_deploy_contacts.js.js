const LoyaltyToken = artifacts.require("./LoyaltyToken.sol");
const LoyaltyDataManager = artifacts.require("./LoyaltyDataManager.sol");
require('dotenv').config();
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
module.exports = async function(deployer) {
  const accounts = await web3.eth.getAccounts();
  const owner =  accounts[1]; //OWNER_ADDRESS ; 
  console.log("Owner", owner)
  await deployer.deploy(LoyaltyToken,'AirportToken', 'ALT',0,99999999999999);
  console.log("Address ",LoyaltyToken.address)
  await deployer.deploy(LoyaltyDataManager,LoyaltyToken.address);
};