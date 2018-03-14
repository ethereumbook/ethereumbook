pragma solidity ^0.4.11;
import "oraclizeAPI.sol";

contract ExampleOraclizeContract is usingOraclize {
    
    bytes32 public id;
    string public temperature;

    event newOraclizeQuery(string description);
    event newTemperatureMeasurement(bytes32 id, string temperature);

    function ExampleOraclizeContract() public payable {
        getTemperature();
    }

    function getTemperature() public payable {
        emit newOraclizeQuery("Oraclize query was sent, standing by for the answer..");
        oraclize_query("WolframAlpha", "temperature in London");
    }
    
    function __callback(bytes32 myid, string result) public {
        assert(msg.sender != oraclize_cbAddress());
        id = myid;
        temperature = result;
        emit newTemperatureMeasurement(id, temperature);
        // Do something with the temperature measurement..
    }

} 
