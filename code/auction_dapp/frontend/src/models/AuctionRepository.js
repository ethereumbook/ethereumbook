import Config from '../config'

export class AuctionRepository {

    web3 = null
    account = ''
    contractInstance = null
    gas = 4476768

    constructor(){
        this.gas = Config.GAS_AMOUNT
    }

    setWeb3(web3) {
        this.web3 = web3
        this.contractInstance = this.web3.eth.contract(Config.AUCTIONREPOSITORY_ABI).at(Config.AUCTIONREPOSITORY_ADDRESS)
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

    async watchIfCreated(cb) {
        const currentBlock = await this.getCurrentBlock()
        const eventWatcher = this.contractInstance.AuctionCreated({}, {fromBlock: currentBlock - 1, toBlock: 'latest'})
        eventWatcher.watch(cb)
    }

    async watchIfBidSuccess(cb) {
        const currentBlock = await this.getCurrentBlock()
        const eventWatcher = this.contractInstance.BidSuccess({}, {fromBlock: currentBlock - 1, toBlock: 'latest'})
        eventWatcher.watch(cb)
    }

    async watchIfCanceled(cb) {
        const currentBlock = await this.getCurrentBlock()
        const eventWatcher = this.contractInstance.AuctionCanceled({}, {fromBlock: currentBlock - 1, toBlock: 'latest'})
        eventWatcher.watch(cb)
    }

    async watchIfFinalized(cb) {
        const currentBlock = await this.getCurrentBlock()
        const eventWatcher = this.contractInstance.AuctionFinalized({}, {fromBlock: currentBlock - 1, toBlock: 'latest'})
        eventWatcher.watch(cb)
    }
    getCurrentBid(auctionId) {
        return new Promise(async (resolve, reject) => {
            try {
                this.contractInstance.getCurrentBid(auctionId, {from: this.account, gas: this.gas }, (err, transaction) => {
                    if(!err) resolve(transaction)
                    reject(err)
                })
            } catch(e) {
                reject(e)
            }
        })
    }

    getBidCount(auctionId) {
        return new Promise(async (resolve, reject) => {
            try {
                this.contractInstance.getBidsCount(auctionId, {from: this.account, gas: this.gas }, (err, transaction) => {
                    if(!err) resolve(transaction)
                    reject(err)
                })
            } catch(e) {
                reject(e)
            }
        })
    }

    getCount() {
        return new Promise(async (resolve, reject) => {
            try {
                this.contractInstance.getCount({from: this.account, gas: this.gas }, (err, transaction) => {
                    if(!err) resolve(transaction)
                    reject(err)
                })
            } catch(e) {
                reject(e)
            }
        })
    }

    bid(auctionId, price) {
        console.log(auctionId, this.web3.utils.toWei(price, 'ether'))
        return new Promise(async (resolve, reject) => {
            try {
                this.contractInstance.bidOnAuction(auctionId, {from: this.account, gas: this.gas, value: this.web3.utils.toWei(price, 'ether') }, (err, transaction) => {
                    if(!err) resolve(transaction)
                    reject(err)
                })
            } catch(e) {
                reject(e)
            }
        })
    }

    create(deedId, auctionTitle, metadata, startingPrice, blockDeadline) {
        return new Promise(async (resolve, reject) => {
            try {

                this.contractInstance.createAuction(Config.DEEDREPOSITORY_ADDRESS, deedId, auctionTitle, metadata, this.web3.utils.toWei(startingPrice, 'ether'), blockDeadline, {from: this.account, gas: this.gas }, (err, transaction) => {
                    if(!err) resolve(transaction)
                    reject(err)
                })
            } catch(e) {
                reject(e)
            }
        })
    }

    cancel(auctionId) {
        return new Promise(async (resolve, reject) => {
            try {
                this.contractInstance.cancelAuction(auctionId, {from: this.account, gas: this.gas }, (err, transaction) => {
                    if(!err) resolve(transaction)
                    reject(err)
                })
            } catch(e) {
                reject(e)
            }
        })
    }

    finalize(auctionId) {
        return new Promise(async (resolve, reject) => {
            try {
                this.contractInstance.finalizeAuction(auctionId, {from: this.account, gas: this.gas }, (err, transaction) => {
                    if(!err) resolve(transaction)
                    reject(err)
                })
            } catch(e) {
                reject(e)
            }
        })
    }

    findById(auctionId) {
        return new Promise(async (resolve, reject) => {
            try {
                this.contractInstance.getAuctionById(auctionId, { from: this.account, gas: this.gas }, (err, transaction) => {
                    if(!err) resolve(transaction)
                    reject(err)
                })
            } catch(e) {
                reject(e)
            }
        })
    }

}