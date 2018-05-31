var AuctionRepository = artifacts.require("./AuctionRepository.sol");
//var DeedRepository = artifacts.require("./DeedRepository.sol");
const fs = require('fs');

contract('AuctionRepository', async (accounts) => {

    it("It should check if the auction repository is initialized", async () => {
        let instance = await AuctionRepository.deployed();
        fs.writeFileSync('./test/output.address', instance.address);
        let auctionLength = await instance.getAuctionsCount();
        assert.equal(auctionLength.valueOf(), 0, `${auctionLength} auctions instead of 0`);
    });

    // it("It should approve transfer of ownership of the 123456789 token", async () => {
    //     //let instance = await DeedRepository.deployed();
    //     //let totalSupply = await instance.totalSupply();
        
    //     let auctionInstance = await AuctionRepository.deployed();
    //     let auctionAddress = auctionInstance.address;
    //     await instance.approve(auctionAddress, 123456789);

    //     // console.log('this auction address:', auctionAddress, ' deedrepo instance addr', instance.address);
    //     let address = await instance.getApproved(123456789);
    //      assert.equal(address.valueOf(), auctionAddress, `${address} should be equal to ${auctionAddress}`);
    // });

    // it("It should transfer ownership of deed to this contract", async () => {
    //     let instance = await DeedRepository.deployed();
    //     let auctionInstance = await AuctionRepository.deployed();
    //     let auctionAddress = auctionInstance.address;
    //     await instance.transferFrom( accounts[0] ,auctionAddress, 123456789, { from: accounts[0]});
    //     let newOwnerAddress = await instance.ownerOf(123456789);
    //     //let success = await instance.isApprovedOrOwner(auctionAddress, 123456789)
    //     assert.equal(newOwnerAddress.valueOf(), auctionAddress, `${newOwnerAddress} should be ${auctionAddress}`);
    // });

    // it(`It should create an auction under ${accounts[0]} account`, async () => {
    //     let instance = await AuctionRepository.deployed();
    //     await instance.createAuction(accounts[0], 123456789, "MYNFT", "meta://", 10, 1533772800, accounts[0] );
    //     let auctionCount = await instance.getAuctionsCountOfOwner(accounts[0]);
    //     assert.equal(auctionCount.valueOf(), 1, `auctions of ${accounts[0]} should be 1`);
    // });

    // it(`It should bid on the last auction`, async () => {
    //     let instance = await AuctionRepository.deployed();
    //     await instance.bidOnAuction(0, 1000);
    //     let bidsCount = await instance.getBidsCount(0);
    //     assert.equal(bidsCount.valueOf(), 1, `bids should be 1`);
    // });

    // it(`It should bid on the last auction`, async () => {
    //     let instance = await AuctionRepository.deployed();
    //     await instance.bidOnAuction(0, 10000 );
    //     let bidsCount = await instance.getBidsCount(0);
    //     assert.equal(bidsCount.valueOf(), 2, `bids should be 1`);
    // });

    
});