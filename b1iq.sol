pragma solidity ^0.4.11;

contract Oracle {
    uint256 public divisor;
    function initRequest(uint256 queryType, function(uint256) external onSuccess, function(uint256) external onFailure) public returns (uint256 id);
    function addArgumentToRequestUint(uint256 id, bytes32 name, uint256 arg)public ;
    function addArgumentToRequestString(uint256 id, bytes32 name, bytes32 arg) public;
    function executeRequest(uint256 id) public;
    function getResponseQueryType(uint256 id) public constant returns(uint256);
    function getResponseUint(uint256 id, bytes32 name) public constant returns(uint256);
    function getResponseString(uint256 id, bytes32 name) public constant returns(bytes32);
    function getResponseError(uint256 id) public constant returns(bytes32);
    function deleteResponse(uint256 id) public constant;
}

contract OracleB1IQClient {
    
    Oracle private oracle;
    event LogError(bytes32 description);

    struct IntradayResult {
        uint256 id;
        bytes32 symbol;
        uint256 open;
        uint256 high;
        uint256 low;
        uint256 close;
        uint256 bid;
        uint256 ask;
        uint256 timestamp;
    }

    IntradayResult[] public intradayResults;

    function OracleB1IQClient(address addr) public payable {
        oracle = Oracle(addr);
        getIntraday("IBM", now);
    }

    function getIntraday(bytes32 ric, uint256 timestamp) public {
        uint256 id = oracle.initRequest(0, this.handleSuccess, this.handleFailure);
        oracle.addArgumentToRequestString(id, "symbol", ric);
        oracle.addArgumentToRequestUint(id, "timestamp", timestamp);
        oracle.executeRequest(id);
    }

    function handleSuccess(uint256 id) public {
        assert(msg.sender == address(oracle));
        bytes32 ric = oracle.getResponseString(id, "symbol");
        uint256 open = oracle.getResponseUint(id, "open");
        uint256 high = oracle.getResponseUint(id, "high");
        uint256 low = oracle.getResponseUint(id, "low");
        uint256 close = oracle.getResponseUint(id, "close");
        uint256 bid = oracle.getResponseUint(id, "bid");
        uint256 ask = oracle.getResponseUint(id, "ask");
        uint256 timestamp = oracle.getResponseUint(id, "timestamp");
        oracle.deleteResponse(id);
        intradayResults.push(IntradayResult(id, ric, open, high, low, close, bid, ask, timestamp));
        // Do something with the price data..        
    }

    function handleFailure(uint256 id) public {
        assert(msg.sender == address(oracle));
        bytes32 error = oracle.getResponseError(id);
        oracle.deleteResponse(id);
        emit LogError(error);        
    }

}
