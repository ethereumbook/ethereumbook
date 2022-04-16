import Vue from 'vue'
import App from './App'
import Config from './config'
import router from './router'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import { ChatRoom } from './models/ChatRoom'
import { DeedRepository } from './models/DeedRepository'
import { AuctionRepository } from './models/AuctionRepository'

var Web3 = require('web3')

// rename to avoid conflict between metamask
// will be used for whisper v5/6
var Web3_1 = require('web3')

Vue.use(VueResource)
Vue.use(Vuetify)
Vue.config.productionTip = false

// state management
var store = {
    debug: true,
    state: {
        // metamask state variable
        metamask: {
            web3DefaultAccount: '',
            metamaskInstalled: false,
            networkId: '',
        },

        // local web3 instance(not metamask)
        web3 : null,
        contractInstance: null,

    },
    networkReady() {
        return this.getNetworkId() != '' && this.getMetamaskInstalled() && this.getWeb3DefaultAccount() != ''
    },
    setNetworkId(networkId) {
        this.state.metamask.networkId = networkId
    },
    getNetworkId() {
        return this.state.metamask.networkId
    },

    setWeb3DefaultAccount(account) {
        this.state.metamask.web3DefaultAccount = account
    },
    getWeb3DefaultAccount() {
        return this.state.metamask.web3DefaultAccount
    },

    setMetamaskInstalled(){
        this.state.metamask.metamaskInstalled = true
    },
    getMetamaskInstalled(){
        return this.state.metamask.metamaskInstalled
    },

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}


Vue.mixin({
    created: function () {
        // Inject the models to components
        this.$chatroomInstance = new ChatRoom()
        this.$deedRepoInstance = new DeedRepository()
        this.$auctionRepoInstance = new AuctionRepository()
        
        this.$chatroomInstance.setWeb3(new Web3_1(Config.SHH_ENDPOINT))

        // one instance of web3 available to all components
        if (typeof web3 !== 'undefined') {
            if (window.ethereum) {
                web3 = new Web3(window.ethereum)
            }
            this.$auctionRepoInstance.setWeb3(web3)
            this.$deedRepoInstance.setWeb3(web3)

            store.setMetamaskInstalled()
            web3.eth.net.getId().then(netId => { store.setNetworkId(netId) })

            // pull accounts every 2 seconds
            setInterval(() => {
                web3.eth.getAccounts((err, data) => {
                    if(data.length > 0) store.setWeb3DefaultAccount(data[0])
                })
            }, 2000)
        }
        // inject config to components
        this.$config = Config
    }
})


new Vue({
    el: '#app',
    data: {
        globalState: store,
    },
    router,
    template: '<App/>',
    components: { App },
    mounted() {

    }
})
