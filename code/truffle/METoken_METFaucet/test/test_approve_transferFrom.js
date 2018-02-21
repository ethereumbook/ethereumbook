var METoken = artifacts.require("METoken");
var METFaucet = artifacts.require("METFaucet");

contract('METoken', function(accounts) {
	var Alice = accounts[0];
	var Bob = accounts[1];


	it("should approve METFaucet for up to 1000 MET ", function() {
		return METoken.deployed().then(instance => {
	  		instance.approve(METFaucet.address, 100000).then(function(result) {
				assert(result.logs[0].event, "Approval", "Expected approval event")
			});
		});
	});
	it("should allow Bob to withdraw 10 MET from METFaucet", function() {
		return METFaucet.deployed().then(instance => {
			instance.withdraw(1000, {from: Bob}).then(function(result) {
				console.log(result.logs);
			});
		});
	});
});
