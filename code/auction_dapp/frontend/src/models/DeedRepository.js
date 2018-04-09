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
        this.contractInstance = this.web3.eth.contract(Config.DEEDREPOSITORY_ABI).at(Config.DEEDREPOSITORY_ADDRESS)
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
        const eventWatcher = this.contractInstance.DeedRegistered({}, {fromBlock: currentBlock - 1, toBlock: 'latest'})
        eventWatcher.watch(cb)
    }

    async watchIfDeedTransfered(cb) {
        const currentBlock = await this.getCurrentBlock()
        const eventWatcher = this.contractInstance.Transfer({}, {fromBlock: currentBlock - 1, toBlock: 'latest'})
        eventWatcher.watch(cb)
    }

    exists(deedId) {
        return new Promise(async (resolve, reject) => {
            this.contractInstance.exists(deedId, {from: this.account, gas: this.gas }, (err, transaction) => {
                if(!err) resolve(transaction)
                reject(err)
            })
        })
    }

    transferTo(to, deedId) {
        return new Promise(async (resolve, reject) => {
            this.contractInstance.transferFrom(this.account, to, deedId, {from: this.account, gas: this.gas }, (err, transaction) => {
                if(!err) resolve(transaction)
                reject(err)
            })
        })
        
    }

    create(deedId, deedURI) {
        console.log('contractinsatnce', this.contractInstance )
        return new Promise(async (resolve, reject) => {
            this.contractInstance.registerDeed(deedId, deedURI, {from: this.account, gas: this.gas }, (err, transaction) => {
                if(!err) 
                    resolve(transaction)
                else
                    reject(err)
            })
        })
    }
}