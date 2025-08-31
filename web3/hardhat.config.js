require("@matterlabs/hardhat-zksync-solc");
require("@matterlabs/hardhat-zksync-verify");
require('dotenv').config({path: '../.env'});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.23",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    sepolia: {
      chainId: 11155111,
      url: `https://eth-sepolia.g.alchemy.com/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.METAMASK_PRIVATE_KEY]
    }
  }
};
