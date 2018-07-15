var AuctionRepository = artifacts.require("./AuctionRepository.sol");
var DeedRepository = artifacts.require("./DeedRepository.sol");
// DeedRepository => 0xbb55adc67f64d1e6f08ba7523ecd2eca2ee434a3
module.exports = function(deployer) {
  deployer.deploy(AuctionRepository);
  deployer.deploy(DeedRepository, "Ultra Auction NFT", "UANFT");
};
