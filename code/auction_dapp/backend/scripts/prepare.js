var deedabi = require("./build/contracts/DeedRepository.json").abi;
var deedaddress = "0x454e7bd1e743ec2517a104758895bec40d9ffb9d";
var auctionabi = require("./build/contracts/AuctionRepository.json").abi;
var auctionaddress = "0x14fba6349fe2f9187d08391b8dc2ca0c3742e285";

var deedinstance = web3.eth.contract(deedabi).at(deedaddress);
var auctioninstance = web3.eth.contract(auctionabi).at(auctionaddress);
var acc = web3.eth.accounts[0];
var ops = { from: acc, gas: 300000 };
//register a deed and transfer to auctionrepository address

deedinstance.registerDeed(acc, 123456789, ops);
deedinstance.approve(auctionaddress, 123456789, ops);
deedinstance.transferFrom( acc ,auctionaddress, 123456789, ops );

// create auction
var startprice = new web3.BigNumber(1000000000000000000)
auctioninstance.createAuction(deedaddress, 123456789, "My title", "meta://", startprice, 1527811200 , ops );

auctioninstance.getAuctionsCount(ops); // should be 1

auctioninstance.getAuctionById(0, ops); 

auctioninstance.bidOnAuction(0, { from: web3.eth.accounts[1], gas: 300000, value: new web3.BigNumber(2000000000000000000) }); // should be 1
// error..cant bid on auction that is owned
auctioninstance.getBidsCount(0, ops)

// balance of account 2 should be 9899xxxxxx
web3.eth.getBalance(web3.eth.accounts[1]).toNumber()

auctioninstance.cancelAuction(0, ops);

// balance back to where it was minus some gas costs
web3.eth.getBalance(web3.eth.accounts[1]).toNumber()

