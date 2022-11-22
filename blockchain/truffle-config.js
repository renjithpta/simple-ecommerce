require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { INFURA_API_URL, MNEMONIC } = process.env;
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
     ropsten: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_URL),
      network_id: 3,
      gas: 5500000
    }
  },
  contracts_directory: './contracts/',
  contracts_build_directory: '../backend/abis/',
  compilers: {
    solc: {
      version: "0.8.10",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}