// Install dependencies:
// npm init
// npm install --save-dev dotenv truffle-wallet-provider ethereumjs-wallet

// Create .env in project root, with keys:
// ROPSTEN_PRIVATE_KEY="123abc"
// MAINNET_PRIVATE_KEY="123abc"

require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3();
const WalletProvider = require("truffle-wallet-provider");
const Wallet = require('ethereumjs-wallet');

var mainNetPrivateKey = new Buffer(process.env["MAINNET_PRIVATE_KEY"], "hex")
var mainNetWallet = Wallet.fromPrivateKey(mainNetPrivateKey);
var mainNetProvider = new WalletProvider(mainNetWallet, "https://mainnet.infura.io/");

var ropstenPrivateKey = new Buffer(process.env["ROPSTEN_PRIVATE_KEY"], "hex")
var ropstenWallet = Wallet.fromPrivateKey(ropstenPrivateKey);
var ropstenProvider = new WalletProvider(ropstenWallet, "https://ropsten.infura.io/");

module.exports = {
	networks: {
		dev: { // Whatever network our local node connects to
			network_id: "*", // Match any network id
			host: "localhost",
			port: 8545
		},
		mainnet: { // Provided by Infura, load keys in .env file
			network_id: "1",
			provider: mainNetProvider,
			gas: 4600000,
			gasPrice: web3.toWei("20", "gwei")
		},
		ropsten: { // Provided by Infura, load keys in .env file
			network_id: "3",
			provider: ropstenProvider,
			gas: 4600000,
			gasPrice: web3.toWei("20", "gwei")
		},
		kovan: {
			network_id: 42,
			host: "localhost", // parity --chain=kovan
			port: 8545,
			gas: 5000000
		},
		ganache: { // Ganache local test RPC blockchain
			network_id: "5777",
			host: "localhost",
			port: 7545,
			gas: 6721975
		},
		aws: { // Private network on AWS
			network_id: "15",
			host: "public-ip-address",
			port: 8545,
			gas: 6721975
		}
	}
};