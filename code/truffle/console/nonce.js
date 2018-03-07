console.log("getTransactionCount (confirmed)");
console.log(web3.eth.getTransactionCount("0x9e713963a92c02317a681b9bb3065a8249de124f"));

console.log("getTransactionCount (pending)");
console.log(web3.eth.getTransactionCount("0x9e713963a92c02317a681b9bb3065a8249de124f", "pending"));

console.log("sendTransaction");
console.log(web3.eth.sendTransaction({from: web3.eth.accounts[0], to: "0xB0920c523d582040f2BCB1bD7FB1c7C1ECEbdB34", value: web3.toWei(0.01, "ether")}));

console.log("getTransactionCount (confirmed)");
console.log(web3.eth.getTransactionCount("0x9e713963a92c02317a681b9bb3065a8249de124f"));

console.log("getTransactionCount (pending)");
console.log(web3.eth.getTransactionCount("0x9e713963a92c02317a681b9bb3065a8249de124f", "pending"));

console.log("sendTransaction");
console.log(web3.eth.sendTransaction({from: web3.eth.accounts[0], to: "0xB0920c523d582040f2BCB1bD7FB1c7C1ECEbdB34", value: web3.toWei(0.01, "ether")}));

console.log("getTransactionCount (confirmed)");
console.log(web3.eth.getTransactionCount("0x9e713963a92c02317a681b9bb3065a8249de124f"));

console.log("getTransactionCount (pending)");
console.log(web3.eth.getTransactionCount("0x9e713963a92c02317a681b9bb3065a8249de124f", "pending"));

console.log("sendTransaction");
console.log(web3.eth.sendTransaction({from: web3.eth.accounts[0], to: "0xB0920c523d582040f2BCB1bD7FB1c7C1ECEbdB34", value: web3.toWei(0.01, "ether")}));

console.log("getTransactionCount (confirmed)");
console.log(web3.eth.getTransactionCount("0x9e713963a92c02317a681b9bb3065a8249de124f"));

console.log("getTransactionCount (pending)");
console.log(web3.eth.getTransactionCount("0x9e713963a92c02317a681b9bb3065a8249de124f", "pending"));

console.log("sendTransaction");
console.log(web3.eth.sendTransaction({from: web3.eth.accounts[0], to: "0xB0920c523d582040f2BCB1bD7FB1c7C1ECEbdB34", value: web3.toWei(0.01, "ether")}));
