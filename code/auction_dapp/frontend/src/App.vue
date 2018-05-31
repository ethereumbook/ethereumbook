<template>
    <v-app :class="getScreen">
        <v-content>
            <v-container v-scroll="onScroll" class="homepage" style="padding:0px;" fluid>
                <v-navigation-drawer
                    class="pl-drawer"
                    style="background-color: rgba(0, 0, 0, 0.76);"
                    disable-resize-watcher
                    disable-route-watcher
                    fixed
                    v-model="drawer"
                    app
                    >
                    <v-list dense>
                        <v-list-tile >
                            <v-list-tile-action>
                                <v-icon>dashboard</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Home</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-action>
                                <v-icon>settings</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Add Auction</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-action>
                                <v-icon>settings</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>View Auctions</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-navigation-drawer>
                <v-layout>
                    <v-flex xs12 sm12 md12>
                        <v-toolbar :class="transparentNav" class="peer-toolbar" fixed dark style="padding-top: 5px;">
                            <v-toolbar-side-icon @click="drawer = !drawer" style="position: fixed;" v-show="!$vuetify.breakpoint.mdAndUp"></v-toolbar-side-icon>
                            <v-toolbar-title v-show="$vuetify.breakpoint.mdAndUp" style="font-weight:100;" class="white--text">Auction Dapp</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <div v-show="!$vuetify.breakpoint.mdAndUp" style="min-height:49px;"> </div>
                            <div v-show="$vuetify.breakpoint.mdAndUp">
                                
                                <v-btn @click="showAuction()" outline color="white">
                                    <v-icon left dark>add</v-icon>
                                    New Auction 
                                </v-btn>
                            </div>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <router-view>
                    <!-- <v-container fluid></v-container> -->
                </router-view>
            </v-container>
        <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon @click.native="dialog = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>New Auction</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <!-- <v-btn dark flat @click.native="dialog = false">Save</v-btn> -->
                    </v-toolbar-items>
                </v-toolbar>
                <v-divider></v-divider>
                <v-list v-show="!networkReady" three-line subheader>
                   <v-subheader style="color:red;">
                       <v-icon color="red">error</v-icon>
                       Error: Please make sure metamask is installed and connected to a network with an account selected
                    </v-subheader>
                </v-list>
                <v-list v-show="networkReady" three-line subheader>
                    <v-subheader>General</v-subheader>
                    <v-stepper v-model="stepperIndex" vertical>
                        <v-stepper-step step="1" v-bind:complete="stepperIndex > 1">
                            Create a Non-fungible token (ERC721 Compilant)
                            <small>Create a Deed/Token</small>
                        </v-stepper-step>
                        <v-stepper-content step="1">
                            <v-card class="mb-5">
                                <v-layout xs12 sm12 md12 row wrap>
                                    <v-flex  style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
                                        <v-text-field
                                            v-model="deed.deedId"
                                            placeholder="e.g "
                                            label="Unique ID - Autogenerated(Edit if required)"
                                            persistent-hint
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="deed.deedURI"
                                            placeholder="ipfs/swarm or domain.eth"
                                            label="DeedURI(ERC721 URI)"
                                            persistent-hint
                                        ></v-text-field>
                                        <div v-show="createAssetSuccess">
                                            <v-icon color="teal">check_circle</v-icon> 
                                            <h3 style="color:green !important;">asset was successfully created</h3>
                                        </div>
                                        <div v-show="creatingAssetError">
                                            <h3 style="color:red !important;">{{creatingAssetError}}</h3>
                                        </div>
                                        <div v-show="creatingAsset">
                                            <h3>Please wait while your asset is deployed...</h3>
                                            <v-progress-linear v-bind:indeterminate="true"></v-progress-linear>
                                        </div>
                                        <v-btn v-show="!createAssetSuccess" :disabled="deed.deedURI.length==0 || creatingAsset" color="teal" outline @click.native="registerDeed()">Create Deed/Token</v-btn>
                                        <!-- <v-btn v-show="!createAssetSuccess" outline color="teal" @click="stepperIndex++">Skip</v-btn> -->
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-btn v-show="createAssetSuccess" outline color="primary" @click="stepperIndex++" flat>Next</v-btn>
                        </v-stepper-content>
                        <v-stepper-step step="2" v-bind:complete="stepperIndex > 2">
                            Transfer ownership of Deed/Token to AuctionRepository
                            <small>Transfer Ownership</small>
                        </v-stepper-step>
                        <v-stepper-content step="2">
                                <v-card class="mb-5">
                                <v-layout xs12 sm12 md12 row wrap>
                                    <v-flex  style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
                                        <v-flex  style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
                                            <v-select v-model="selectedDeed" :items="deeds" label="Asset" ></v-select>
                                        </v-flex>
                                        <div v-show="transferDeedSuccess">
                                            <v-icon color="teal">check_circle</v-icon> 
                                            <h3 style="color:green !important;">Ownership was successfully transfered</h3>
                                        </div>

                                        <div v-show="transferingDeed">
                                            <h3>Please wait while transfering ownership</h3>
                                            <v-progress-linear v-bind:indeterminate="true"></v-progress-linear>
                                        </div>
                                        <v-btn :disabled="selectedDeed==null || transferDeedSuccess || transferingDeed " @click="transferTo()" outline color="teal">Transfer Ownership</v-btn>
                                        <v-btn v-show="transferDeedSuccess" outline color="primary" @click="stepperIndex++">Next</v-btn>
                                        <!-- <v-btn outline color="teal" @click="stepperIndex++">Skip</v-btn> -->
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </v-stepper-content>

                        <v-stepper-step step="3" v-bind:complete="stepperIndex > 3">
                            Create an auction
                            <small>Enter the details of the auction</small>
                        </v-stepper-step>
                        <v-stepper-content step="3">
                            <v-card class="mb-5" >
                                <v-layout xs12 sm12 md12 row wrap>
                                    <v-flex  style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
                                        <v-select v-model="auction.deedId" :items="deeds" label="Deed ID" ></v-select>
                                    </v-flex>
                                    
                                    <v-flex  style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
                                        <v-text-field
                                            v-model="auction.auctionTitle"
                                            placeholder="e.g. My NFT"
                                            label="Auction title"
                                            persistent-hint
                                            ></v-text-field>
                                    </v-flex>

                                    <v-flex  style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
                                        <b style="color:red;">Image(png/jpg):</b> <input  type="file" @change="fileSelectionEvent($event)">
                                    </v-flex>

                                    <v-flex  style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
                                        <v-text-field
                                            v-model="auction.startingPrice"
                                            placeholder="10 Ethers"
                                            label="Starting Price"
                                            persistent-hint
                                            ></v-text-field>
                                    </v-flex>
                                    <!-- <v-flex  style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
                                        <v-text-field
                                            v-model="auction.reservePrice"
                                            placeholder="30 Ethers"
                                            label="Reserve Price"
                                            persistent-hint
                                            ></v-text-field>
                                    </v-flex> -->
                                    <v-flex  style="height:100%; padding-bottom:20px;" xs12 sm6 md6>
                                        <v-text-field
                                            v-model="auction.timeInDays"
                                            placeholder="30 Days"
                                            label="Auction Expiration ( in days )"
                                            persistent-hint
                                            ></v-text-field>
                                    </v-flex>
                                    <v-flex  style="height:100%; padding-bottom:20px;" xs12 sm6 md6>
                                        <v-text-field
                                            v-model="auction.timeInBlocks"
                                            disabled
                                            placeholder=""
                                            label="Equivalent unix timestamp"
                                            persistent-hint
                                            ></v-text-field>
                                    </v-flex>
                                    <v-flex  style="height:100%; padding-bottom:20px;" xs12 sm6 md6>
                                        <v-btn @click="uploadAndCreateAuction()" outline color="teal">Create Auction</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            
                        </v-stepper-content>
                    </v-stepper>
                </v-list>
            </v-card>
        </v-dialog>

        <v-dialog v-model="loadingModal" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">Please wait</v-card-title>
                <v-card-text style="text-align: center;">
                    <v-progress-circular indeterminate v-bind:size="50" color="teal"></v-progress-circular>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <div v-show="statusPopup" class="dialog bottom-sheet bottom-sheet--inset dialog--active dialog--persistent" style="background-color:white; max-width: 100% !important; -webkit-box-align: center;align-items: center;display: flex;/* height: 100%; */-webkit-box-pack: center;justify-content: center;left: 0px;position: fixed;bottom: 0px;transition: 0.3s ease-in-out;z-index: 6;outline: none;">
            <div style="cursor: pointer; position:absolute; top:0; right:0;">
                <v-icon @click="closeStatus()">clear</v-icon>
            </div>
            <v-layout style="padding:10px;" wrap row>
                <v-flex xs12 sm4 md4>
                    <div v-show="getMetamaskInstalled">
                        <v-icon color="teal">check_circle</v-icon> Metamask installed
                    </div>
                    <div v-show="!getMetamaskInstalled">
                        <v-icon  color="red">error</v-icon> Metamask not installed
                    </div>
                </v-flex>
                <v-flex xs12 sm4 md4>
                    <div v-show="getNetworkId != ''">
                         <v-icon color="teal">check_circle</v-icon> Connected to network: {{getNetworkId}}
                    </div>
                    <div v-show="getNetworkId == ''">
                         <v-icon color="red">error</v-icon> Select a network
                    </div>
                   
                </v-flex>
                <v-flex xs12 sm4 md4>
                    <div v-show="getWeb3DefaultAccount != ''">
                        <v-icon color="teal">check_circle</v-icon> Account: {{getWeb3DefaultAccount}}
                    </div>
                   <div v-show="getWeb3DefaultAccount == ''">
                        <v-icon color="red">error</v-icon> Select metamask account
                    </div>
                </v-flex>
                <!-- <v-flex xs12 sm4 md3>
                    <v-icon color="red">error</v-icon> Contracts not found
                </v-flex> -->
            </v-layout>
        </div>

            <v-fab-transition>
                <v-btn
                color="teal"
                dark
                fixed
                bottom
                right
                fab
                v-show="!statusPopup"
                @click="statusPopup = !statusPopup"
                >
                <v-icon>cached</v-icon>
                </v-btn>
            </v-fab-transition>

        </v-content>
    </v-app>
</template>
<script>

export default {
    name: 'app',
    data: () => ({
        // deed model
        deed: {
            deedId: null,
            deedURI: '',
        },

        // selected deed for transfer
        selectedDeed: null,
        transferDeedSuccess: false,
        transferingDeed: false,
        

        // deployed deeds
        deeds: [],

        // auction model
        auction: {
            deedId: '',
            metadata: '',
            auctionTitle: '',
            timeInDays: 0,
            timeInBlocks: 0,
            startingPrice: null,
            reservePrice: null,
            fileInput: null,
           
        },

        // network status popup
        statusPopup: true,

        // asset creation helpers
        createAssetSuccess: false,
        creatingAssetError: null,
        creatingAsset: false,
        stepperIndex: 1,
        dialog: false,
        loadingModal: false,
        drawer: false,
        offsetTop: 0,
        
        // error handling
        error: null
    }),
    computed: {
        networkReady(){
            return this.$root.$data.globalState.networkReady()
        },
        getNetworkId() {
            return this.$root.$data.globalState.getNetworkId()
        },
        getMetamaskInstalled() {
            return this.$root.$data.globalState.getMetamaskInstalled()
        },
        getWeb3DefaultAccount(){
            return this.$root.$data.globalState.getWeb3DefaultAccount()
        },
        /**
         * Returns whether screen is mobile or desktop
         * @return {string} screen size
         */
        getScreen () {
            return !this.$vuetify.breakpoint.mdAndUp ? 'is-mobile' : 'is-desktop'
        },

        /**
         * If mobile remove the logo otherwise place the logo
         * @return {string} class to be applied to the div
         */
        centerOrLeft() {
            return !this.$vuetify.breakpoint.mdAndUp ? "logo-center-mobile" : "logo-left-desktop";
        },

        /**
         * Returns if window is scrolled 40px from initial position
         * @return {string} class to be applied to the toolbar
         */
        transparentNav() {  
            return this.offsetTop > 40  ? "pl-darkbg-toolbar" : "pl-transparentbg-toolbar"; }
        },
    watch: {
        
        // watch for the property for changes and update the associated filed
        'auction.timeInDays': function(val){

            let now = new Date();
            let tms = now.setDate(now.getDate() + parseInt(val));

            // ~15 seconds per block
            this.auction.timeInBlocks = parseInt(tms / 1000)
            //this.auction.timeInBlocks = val * 86400 / 15
        }
    },
    methods: {

        async transferTo(){
            try {
                this.transferingDeed = true
                this.$deedRepoInstance.setAccount(this.getWeb3DefaultAccount)
                const res = await this.$deedRepoInstance.transferTo( this.$config.AUCTIONREPOSITORY_ADDRESS, this.selectedDeed )
                this.$deedRepoInstance.watchIfDeedTransfered((error, result) => {
                    if(!error) this.transferDeedSuccess = true
                     this.transferingDeed = false
                })

            } catch(e){
                alert('problem')
            }

        },
        /**
         * uploades the metadata of an auction to swarm and executes the smartcontract
         */
        async uploadAndCreateAuction() {
            try {
                this.loadingModal = true

                // create from data and attach the auction property
                let formData = new FormData()
                Object.keys(this.auction).map((key) => {
                    formData.append(key, this.auction[key])
                })
                const response = await this.$http.post(`${this.$config.BZZ_ENDPOINT}/bzz:/`, formData)
                this.auction.metadata = response.body

                console.log(this.auction)

                // create the smart contract
                this.$auctionRepoInstance.setAccount(this.getWeb3DefaultAccount)
                const transaction = await this.$auctionRepoInstance.create(this.auction.deedId, this.auction.auctionTitle, this.auction.metadata, this.auction.startingPrice, this.auction.timeInBlocks)
                this.$auctionRepoInstance.watchIfCreated((error, result) => {
                    if(!error) {
                        this.loadingModal = false
                        this.dialog = false
                        location.reload()
                    }
                })


            } catch(e) {
                this.error = e.message
            } 
        },

        /**
         * registers a deed in the DeedRepository contract
         */
        async registerDeed(){
            try {
                
                this.creatingAsset = true
                this.createAssetError = null
                
                this.$deedRepoInstance.setAccount(this.getWeb3DefaultAccount)
                var trnasaction = await this.$deedRepoInstance.create(this.deed.deedId, this.deed.deedURI)

                this.$deedRepoInstance.watchIfCreated((error, result) => {
                    // might get called multiple times
                    if(this.createAssetSuccess) return
                    // set GUI
                    this.creatingAsset = false

                    if(!error)
                        this.createAssetSuccess = true
                    else
                        this.creatingAssetError = `Couldn't verify asset creation process. Please try again`
                    
                    // get the localstorage and push the new asset
                    let localStorageItems = this.getLocalStorageItems()
                    if(localStorageItems){
                        localStorageItems.push(this.deed.deedId)
                    } else {
                        localStorageItems = [this.deed.deedId]
                    }
                    localStorage.setItem('deeds', JSON.stringify(localStorageItems))

                    this.deeds.push(this.deed.deedId)
                    
                })
            } catch ( e ) {
                // unexpected error
                this.creatingAsset = false
                this.creatingAssetError = `An unexpected error occured: ${e.message}`
            }
        },


        /**
         * Returns whether a status popup is active
         * @return {bool} 
         */
        closeStatus() {
            this.statusPopup = false
        },
    
        /**
         * Returns the offset from top
         * @return {int} 
         */
        onScroll(e) {
            this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
        },

        /**
         * Show the auction dialog
         */
        showAuction() {
            // get random deedid
            this.deed.deedId = new web3.BigNumber(`${this.$root.$data.globalState.getRandomInt(123456789,999999999)}${this.$root.$data.globalState.getRandomInt(123456789,999999999)}`)
            this.dialog = true;
        },

        /**
         * Event gets triggered when a file input is changed
         */
        fileSelectionEvent(event){
            this.auction.fileInput = event.target.files[0]
        },


        /**
         * Gets the localstorage deed ids 
         */
        getLocalStorageItems() {
            let localStorageItems = localStorage.getItem('deeds')
            if( localStorageItems && JSON.parse(localStorageItems ) instanceof Array){
                localStorageItems = JSON.parse(localStorageItems)
                return localStorageItems
            } 
            return false
        }
    },
    mounted() {
        let localStorageItems = this.getLocalStorageItems()
        if(localStorageItems){
            localStorageItems.map((deed) => {
                this.deeds.push(deed)
            }) 
        }
    }
}
</script>
<style>

.pl-drawer ul {
    background: none !important;
}
.pl-drawer a {
    color: white !important;
}
.pl-drawer i {
    color: #ffffff !important;
}
.is-mobile .pl-intro {
    padding: 60px 5px 0px 5px;
    text-align: center;
}
.is-mobile .pl-intro h1,
.is-mobile .pl-intro-2 h1 {
    font-size: 3em !important;
    text-shadow: 1px 1px #000;
}
.is-mobile .pl-intro h3,
.is-mobile .pl-intro-2 h3 {
    font-size: 1.6em !important;
    text-shadow: 1px 1px #000;
}
.is-desktop .pl-intro {
    padding: 100px;
    text-align: left;
}
.is-mobile .pl-intro-2 {
    padding: 60px 5px 0px 5px;
    text-align: center;
}
.is-desktop .pl-intro-2 {
    padding: 100px;
    text-align: left;
}
.pl-darkbg-toolbar {
    background-color: #1d3446 !important;
}
.pl-transparentbg-toolbar {
    background: none !important;
    box-shadow: none !important;
}
.logo-center-mobile {
    width: 100% !important;
}
.logo-left-desktop {
    width: auto !important;
    margin-left: 20px;
}
.toolbar__content {
    height: 100% !important;
}
.peer-toolbar .toolbar__side-icon {
    position: fixed;
    top: 3px;
}
.peer-toolbar a {
    color: #fff;
    margin-left: 24px;
    text-decoration: none;
    font-size: 1.1em;
}
.custom-header {
    color: #ffffff;
    font-size: 5em;
    font-weight: 400;
}
</style>