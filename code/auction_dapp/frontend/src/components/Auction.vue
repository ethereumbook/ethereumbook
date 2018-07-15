<template>
    <div>
        <v-layout style="background: linear-gradient(to right, rgb(29, 52, 70), rgb(25, 28, 31)); padding:0px;" justify-center align-center row wrap>
            <div  style=" text-align:center; width:100%;">
                <v-layout justify-center align-center row wrap>
                    <v-flex class="pl-intro" style="height:100%;" xs12 sm12 md6>
                        <h1 class="custom-header" style="font-size: 3em; font-weight: 400;"> Auction Details</h1>
                        <!-- <h3 class="custom-header" style="font-size: 1.6em; font-weight: 100;"></h3> -->
                        <br />
                    </v-flex>
                </v-layout>
            </div>
        </v-layout>
        <v-layout wrap row v-for="auc in auction" :key="auc.id">
            <v-flex d-flex xs12 sm12 md8 style="">
                <div style="text-align:left; color:#fff; padding:20px; box-shadow: 0px 0px 13px -3px #888888; background-color: #26313d;">
                <h2><v-icon dark >receipt</v-icon> {{auc.title}} </h2>
                <v-flex d-flex xs12 sm12 md12 style="text-align:left; margin-top:7px;">
                    <h3><v-icon dark >account_circle</v-icon> <b>Auction creator: </b> {{auc.owner}}</h3>
                </v-flex>
                <v-flex d-flex xs12 sm12 md12 style="text-align:left; margin-top:7px;">
                    <h3><v-icon dark >account_balance_wallet</v-icon> <b>Starting price: </b> {{auc.startingPrice}} ETH</h3>
                </v-flex>
                <v-flex d-flex xs12 sm12 md12 style="text-align:left; margin-top:7px;">
                    <h3><v-icon dark >account_balance_wallet</v-icon> <b>Current bid: </b> {{auc.lastBidAmount}} ETH</h3>
                </v-flex>
                <v-flex d-flex xs12 sm12 md12 style="text-align:left; margin-top:7px;">
                    <h3><v-icon dark >perm_identity</v-icon> <b>{{auc.bids}}</b> bids</h3>
                </v-flex>
                <v-flex d-flex xs12 sm12 md12 style="text-align:left; margin-top:7px;">
                    <h3><v-icon dark >account_circle</v-icon> Last bidder: <b>{{auc.lastBidAccount}}</b></h3>
                </v-flex>
                <v-flex d-flex xs12 sm12 md12 style="text-align:left; margin-top:7px;">
                    <h3><v-icon dark >date_range</v-icon> Expires on: <b>{{auc.expirationDate}}, {{auc.timeLeft}} remaining</b></h3>
                </v-flex>
                <v-flex d-flex xs12 sm12 md12 style="text-align:left; margin-top:7px;">
                    <h3><v-icon dark >info</v-icon>Auction status: <b>{{auctionStatus(auc)}}</b></h3>
                </v-flex>

                <!-- <v-progress-linear :value="20" height="15" color="teal"></v-progress-linear> -->
                    
                <div style="margin-top:13px;">
                    <v-btn :disabled="isAuctionOwner(auc) || !auc.active" @click="bidModal = true" style=" margin:0; width:100%;" color="teal" dark> Bid now </v-btn>
                    <span style="color:red;" v-show="isAuctionOwner(auc)">You can't bid on your own auctions</span>
                </div>
                <div style="margin-top:13px;">
                    <v-btn @click="cancelAuction(auc.id)" :disabled="!isAuctionOwner(auc) || !auc.active" style=" margin:0; width:100%;" color="teal" dark> Cancel Auction </v-btn>
                </div>
                <div style="margin-top:13px;">
                    <v-btn @click="finalizeAuction(auc.id)" :disabled="!isAuctionOwner(auc) || !isLastBidder(auc)" style=" margin:0; width:100%;" color="teal" dark> Finalize Auction </v-btn>
                </div>
                </div>
            </v-flex>
            <v-flex d-flex xs12 sm12 md4 style="">
                <v-carousel>
                    <v-carousel-item v-bind:src="auc.image"></v-carousel-item>
                </v-carousel>
            </v-flex>

        </v-layout>
        <v-layout  style=" color: white; padding: 25px; text-align: center;     background-color: rgb(3, 46, 66);"  align-center row wrap>
            <v-flex style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
                
                <h1 style="margin-bottom: 20px; line-height: 32px;">Chatroom</h1>
                <div v-show="!joined" style="width: 60%; margin: 0 auto;">
                    <v-text-field
                        v-model="identity"
                        label="Username"
                        dark
                    ></v-text-field>
                    <v-btn @click="joinRoom()" :disabled="loading" outline color="white"> <v-progress-circular v-show="loading" indeterminate v-bind:size="20" color="teal"></v-progress-circular> Join</v-btn>
                </div>
            </v-flex>
        </v-layout>
        <v-layout v-show="connected" wrap row>
            <v-flex xs12 sm3 md3>
            <v-card>
                <v-list subheader>
                <v-subheader>Users</v-subheader>
                    <v-list-tile avatar v-for="item in users" v-bind:key="item.identity">
                    <v-list-tile-avatar>
                        <v-badge  overlap color="teal">
                            <span style="background-color:#4fca21 !important;" slot="badge"></span>
                            <v-avatar
                                class=" smaller-avatar"
                            >
                                <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-256.png"/>
                            </v-avatar>
                        </v-badge>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title v-html="item.identity"></v-list-tile-title>
                    </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-divider></v-divider>
            </v-card>
            </v-flex>
            <v-flex xs12 sm9 md9>
            <v-card>
                <v-list three-line>
                    <v-subheader >Conversations</v-subheader>
                    <template v-for="(item, i) in messages">
                        <v-divider :key="i"></v-divider>
                        <v-list-tile avatar v-bind:key="item.data">
                        <v-list-tile-avatar>
                        <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-256.png"/>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title style="font-size:14px; color:gray;" v-html="item.identity"></v-list-tile-title>
                            <v-list-tile-sub-title style="font-size:17px; color:black;" v-html="item.data"></v-list-tile-sub-title>
                        </v-list-tile-content>
                        </v-list-tile>
                    </template>
                    <v-list-tile avatar >
                        <v-list-tile-avatar>
                            <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-256.png"/>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-sub-title >
                                <v-text-field
                                    id="compose"
                                    v-model="myMessage"
                                    label="Click here to type a message"
                                    @keyup.enter="sendMessage()"
                                ></v-text-field>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
    <v-dialog v-model="loadingModal" persistent max-width="290">
        <v-card>
            <v-card-title class="headline">Please wait...</v-card-title>
            <v-card-text style="text-align: center;">
                <v-progress-circular indeterminate v-bind:size="50" color="teal"></v-progress-circular>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="bidModal" max-width="290">
        <v-card>
            <v-card-title class="headline">Bid amount</v-card-title>
            <v-card-text style="text-align: center;">
                 <v-flex  style="height:100%; padding-bottom:5px;" xs12 sm12 md12>
                    <v-text-field
                        v-model="bidPrice"
                        placeholder="e.g. 0.6"
                        label="Bid amount"
                        persistent-hint
                    ></v-text-field>
                </v-flex>
                 <v-flex  style="height:100%; padding-bottom:5px;" xs12 sm12 md12>
                    <v-btn @click="bid()" outline color="teal">Bid Now</v-btn>
                </v-flex>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>

</div>
</template>
<script>
    import { AuctionRepository } from '../models/AuctionRepository'
    import moment from 'moment'
    export default {
        data: () => ({
            auction: [],
            roomHex: '',
            bidPrice: null,
            bidModal: false,
            loadingModal: true,
            loading: false,
            connected: true,
            joined: false,
            identity: '',
            myMessage: '',
            messages: [],
            users: [],
        }),
        computed: {

        },
        methods: {
            convertAuctionIDtoPaddedHex(auctionId) {
                return `0x${("00000000" + auctionId.toString(16)).substr(-8)}`
            },
            isAuctionOwner(auction){
                return auction.owner == this.$root.$data.globalState.getWeb3DefaultAccount()
            },
            isLastBidder(auction){
                return auction.lastBidAccount == this.$root.$data.globalState.getWeb3DefaultAccount()
            },
            auctionStatus(auction) {
                if(auction.finalized && !auction.active) return 'Ended'
                return auction.active ? 'Active' : 'Canceled'
            },
            async bid() {
                this.bidModal = false
                this.loadingModal = true
                this.$auctionRepoInstance.setAccount(this.$root.$data.globalState.getWeb3DefaultAccount())
                const result = await this.$auctionRepoInstance.bid(this.auction[0].id, this.bidPrice)
                this.$auctionRepoInstance.watchIfBidSuccess((error, result) => {
                     this.getAuction(this.$route.params.id) 
                     this.loadingModal = false
                })
            },
            async cancelAuction(auctionId) {
                this.loadingModal = true
                this.$auctionRepoInstance.setAccount(this.$root.$data.globalState.getWeb3DefaultAccount())
                const result = await this.$auctionRepoInstance.cancel(auctionId)
                this.$auctionRepoInstance.watchIfCanceled((error, result) => {
                    this.loadingModal = false
                    this.getAuction(this.$route.params.id) 
                })
            },
            async finalizeAuction(auctionId) {
                this.loadingModal = true
                this.$auctionRepoInstance.setAccount(this.$root.$data.globalState.getWeb3DefaultAccount())
                const result = await this.$auctionRepoInstance.finalize(auctionId)
                this.$auctionRepoInstance.watchIfFinalized((error, result) => {
                    this.loadingModal = false
                    this.getAuction(this.$route.params.id) 
                })
            },
            async sendMessage() {
                const result = await this.$chatroomInstance.sendMessageEvent(this.identity, this.roomHex, this.myMessage)
                this.myMessage = ''

            },
            joinRoom() {
                try {
    
                    if(this.identity== '') {
                        alert('Please enter a username')
                        return
                    }
                    this.joined = true
                    this.loading = true
                    //this.$root.$data.globalState.joinChatRoom('test', this.identity) //0xffaadd11
                    
                    this.$chatroomInstance.sendJoinEvent(this.identity, this.roomHex, '')
                    this.$chatroomInstance.subscribeToTopic(this.roomHex, (data) => {
                        const payload = JSON.parse(this.$chatroomInstance.getWeb3().utils.hexToString(data.payload))
                        // check if already in users..(handle delay)
                        if (payload.type == 'join') {
                            this.users.push(payload)
                            this.connected = true
                        }
                        if (payload.type == 'msg') {
                            this.messages.push(payload)
                            this.$nextTick(function(){
                                document.getElementById("compose").scrollIntoView()
                            })
                        }
                    })
                } catch (e) {
                    this.error = e.message

                } finally {
                    this.loading = false
                }

            },
            async getAuction(auctionId) {
                    this.$auctionRepoInstance.setAccount('')
                    let bidCount = await this.$auctionRepoInstance.getBidCount(auctionId)
                    let lastBidAmount = 0, lastBidAccount = 'N/A'
                    if(bidCount > 0) {
                        const res = await this.$auctionRepoInstance.getCurrentBid(auctionId)
                        lastBidAmount = this.$auctionRepoInstance.getWeb3().fromWei(res[0].toNumber(), 'ether')
                        lastBidAccount = res[1]
                    }
                    let auction = await this.$auctionRepoInstance.findById(auctionId)
                    // get metadata
                    const swarmResult = await this.$http.get(`${this.$config.BZZ_ENDPOINT}/bzz-list:/${auction[3]}`)
                    let imageUrl = ''
                    swarmResult.body.entries.map((entry) => {
                        if('contentType' in entry) imageUrl = `${this.$config.BZZ_ENDPOINT}/bzz-raw:/${auction[3]}/${entry.path}`
                    })
                    
                    let expires = new Date(auction[1].toNumber() * 1000 ), now = new Date()
                    const expirationInHuman = moment.duration(moment(now).diff(expires)).humanize()

            
                    let compactAuction = [{
                        id: auctionId,
                        bids: parseInt(bidCount),
                        lastBidAmount: lastBidAmount,
                        lastBidAccount: lastBidAccount,
                        image: imageUrl,
                        title: auction[0],
                        timeLeft: expirationInHuman,
                        expirationDate: moment(new Date(auction[1].toNumber() * 1000)).format('dddd, MMMM Do YYYY, h:mm:ss a'),
                        startingPrice: this.$auctionRepoInstance.getWeb3().fromWei(auction[2].toNumber(), 'ether'),
                        metadata: auction[3],
                        deedId: auction[4].toNumber(),
                        deedRepositoryAddress: auction[5],
                        owner: auction[6],
                        active: auction[7],
                        finalized: auction[8]
                    }]
                    this.$set(this, 'auction', compactAuction)
                    this.loadingModal = false
            }
        },
        async mounted() {
            this.roomHex = this.convertAuctionIDtoPaddedHex(parseInt(this.$route.params.id))
            this.getAuction(this.$route.params.id)
        },
    };
</script>
<style>
    .smaller-avatar {
        min-width: 0px !important;
        width: 40px !important;
        height: 40px !important;
    }
</style>