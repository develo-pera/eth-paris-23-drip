require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: "https://blue-broken-river.matic-testnet.discover.quiknode.pro/65fa09d49eda7b1d66a54b2fa11218dd77a0b082/",
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC || ""
      }
    }
  },
};
