const axios = require("axios")
const url = "http://172.16.163.129:8545"

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

requests.map(async (request) => {
  try {
    // send the request
    console.log("Call procedure: ", request.method)
    const result = await axios.post(url, request)

    // check for errors
    if(result.data.error) 
      console.log("Error: ", result.data.error.message)
    else
      console.log("Ethereum node response: ", result.data)
  } catch (e) {
    console.log("Error while connecting to the remote server", e)
  }

})