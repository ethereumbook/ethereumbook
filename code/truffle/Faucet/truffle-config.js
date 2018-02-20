module.exports = {
	networks: {
		localnode: { // Whatever network our local node connects to
			network_id: "*", // Match any network id
			host: "localhost",
			port: 8545,
			gas: 4700000,
			gasPrice: 100000000000,
		}
	}
};
