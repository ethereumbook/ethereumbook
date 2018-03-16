const WebSocket = require('ws');
const wsEndpoint = "ws://172.16.163.129:8546"
const ws = new WebSocket(wsEndpoint);

const requests = [
  {
    // Get the current block number
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
    id: 1234
  },
  {
    // Get accounts on this node
    jsonrpc: "2.0",
    method: "eth_accounts",
    params: [],
    id: 12345
  }
]

// Connection is established
ws.on('open', function open() {
  requests.map((req) => { 
    console.log("Call procedure: ", req.method)
    ws.send(JSON.stringify(req)) 
  })
});

// Listen for incoming messages
ws.on('message', function incoming(data) {
  console.log("Ethereum node response: ", JSON.parse(data));
});
