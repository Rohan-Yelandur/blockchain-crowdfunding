require("@matterlabs/hardhat-zksync-solc");
require("@matterlabs/hardhat-zksync-verify");
require('dotenv').config({path: '../.env'});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.23",
    defaultNetwork: 'sepolia',
    networks: {
      hardhat: {},
      sepolia: {
        chainId: 11155111,
        url: `https://11155111.rpc.thirdweb.com/${process.env.THIRDWEB_CLIENT_ID}`,
        accounts: [process.env.METAMASK_PRIVATE_KEY]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
