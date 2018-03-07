var METoken = artifacts.require("METoken");
var METFaucet = artifacts.require("METFaucet");
var owner = web3.eth.accounts[0];

module.exports = function(deployer) {

	// Deploy the METoken contract first
	deployer.deploy(METoken, {from: owner}).then(function() {
		// then deploy METFaucet and pass the addres of METoken
		// and the address of the owner of all the MET who will approve METFaucet
		return deployer.deploy(METFaucet, METoken.address, owner);
  	});
}
