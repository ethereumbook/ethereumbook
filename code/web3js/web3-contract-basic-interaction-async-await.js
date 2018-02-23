#!/usr/bin/env node

/**
 * @author Francisco Javier Rojas García <fjrojasgarcia@gmail.com>
 */

console.log('Mastering Ethereum - web3.js basic interactions using async/await')
console.log('Author: Francisco Javier Rojas García - fjrojasgarcia@gmail.com')

var Web3 = require('web3');
var fs = require('fs')

// Prepare your Infura host url
var infura_host = "https://kovan.infura.io"

// Instantiate web3 provider
var web3 = new Web3(infura_host);

// Let's do some basic interactions at web3 level
async function basicInterations() {
  // Let's see the Protocol Version
  var protocolVersion = await web3.eth.getProtocolVersion();
  console.log(`Protocol Version: ${protocolVersion}`);

  // Now I'm curious about the current gas price
  var gasPrice = await web3.eth.getGasPrice();
  console.log(`Gas Price: ${gasPrice}`);

  // And, Whats the last mined block in my chain?
  var blockNumber = await web3.eth.getBlockNumber();
  console.log(`Block Number: ${blockNumber}`);

  // Now let's dive into some basics actions with a contract
  // We will use the contract at;
  // https://kovan.etherscan.io/address/0xd0a1e359811322d97991e03f863a0c30c2cf029c#code

  // First things first, let's initialize our contract address
  var our_contract_address = "0xd0A1E359811322d97991E03f863a0C30C2cF029C";

  // Let's see its balance
  var balance = await web3.eth.getBalance(our_contract_address);
  console.log(`Balance of ${our_contract_address}: ${balance}`);

  // Now let's see its byte code
  var code = await web3.eth.getCode(our_contract_address);
  console.log("Contract code: ----------------------------------------------\n");
  console.log(code);
  console.log("-------------------------------------------------------------\n");

  // Let's initialize our contract url in Etherescan for Kovan chain
  var etherescan_url = `http://kovan.etherscan.io/api?module=contract&action=getabi&address=${our_contract_address}`
  console.log(etherescan_url);

  var client = require('node-rest-client-promise').Client();

  var etherescan_response = await client.getPromise(etherescan_url)

  // Leave this two lines for future object analysis
  //const util = require('util')
  //console.log(util.inspect(etherescan_response, false, null))

  // We get here our contract ABI
  our_contract_abi = JSON.parse(etherescan_response.data.result);

  // Let's instantiate our contract object
  var our_contract = await new web3.eth.Contract(our_contract_abi, our_contract_address);

  // Let's see our contract address
  console.log(`Our Contract address:  ${our_contract._address}`);

  // or in this other way
  console.log(`Our Contract address in other way:  ${our_contract.options.address}`);

  // Now our contract abi
  console.log("Our contract abi: " + JSON.stringify(our_contract.options.jsonInterface));

  // This is turning more interesting, let's see what's going with our contract methods
  // Now let's see our contract total supply
  var totalSupply = await our_contract.methods.totalSupply().call();
  console.log(`Total Supply of Our Contract address ${our_contract._address}:  ${totalSupply}`);

  // Now let's see our contract public variable name  
  var name = await our_contract.methods.name().call();
  console.log(`Public variable name of our Contract address ${our_contract._address}:  ${name}`);

  // Now let's see our contract public variable symbol  
  var symbol = await our_contract.methods.symbol().call();
  console.log(`Public variable symbol of our Contract address ${our_contract._address}:  ${symbol}`);
}

// Let's interact with a node
basicInterations();
