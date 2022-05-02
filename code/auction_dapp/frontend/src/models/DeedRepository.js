import Config from '../config'

export class DeedRepository {

    web3 = null
    account = ''
    contractInstance = null
    gas = 4476768

    constructor(){
        this.gas = Config.GAS_AMOUNT
    }
    setWeb3(web3) {
        this.web3 = web3
        this.contractInstance = new this.web3.eth.Contract(Config.DEEDREPOSITORY_ABI,Config.DEEDREPOSITORY_ADDRESS)
    }
    
    getWeb3() {
        return this.web3
    }

    setAccount(account){
        this.account = account
    }

    getCurrentBlock() {
        return new Promise((resolve, reject ) => {
            this.web3.eth.getBlockNumber((err, blocknumber) => {
                if(!err) resolve(blocknumber)
                reject(err)
            })
        })
    }

    // getAccounts() {
    //     return new Promise((resolve, reject ) => {
    //         this.web3.eth.getAccounts((err, accounts) => {
    //             if(!err) resolve(accounts)
    //             reject(err)
    //         })
    //     })
    // }

    async watchIfCreated(cb) {
        const currentBlock = await this.getCurrentBlock()
	this.contractInstance.events.DeedRegistered({
            filter: {}, 
            fromBlock: currentBlock - 1
            },  cb)
    }

    async watchIfDeedTransfered(cb) {
        const currentBlock = await this.getCurrentBlock()
        this.contractInstance.events.Transfer({
            filter: {}, 
            fromBlock: currentBlock - 1
            }, cb)
    }

    exists(deedId) {
        return new Promise(async (resolve, reject) => {
            this.contractInstance.methods.exists(deedId).call({from: this.account, gas: this.gas }, function(err, transaction) {
                if(!err) resolve(transaction)
                reject(err)
            })
        })
    }

    transferTo(to, deedId) {
        return new Promise(async (resolve, reject) => {
            this.contractInstance.methods.transferFrom(this.account, to, deedId).send({from: this.account, gas: this.gas }, function(err, transaction) {
                if(!err) resolve(transaction)
                reject(err)
            })
        })
        
    }

   create(deedId, deedURI) {
       return new Promise(async (resolve, reject) => {
          this.contractInstance.methods.registerDeed(deedId, deedURI).send({from: this.account, gas: this.gas }, function(err, transaction) {    
              if(!err) {
                  resolve(transaction)
	      }
              else {
                  reject(err)
       	      }
          })
       })
   } 
}
