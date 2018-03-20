package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net"
	"sync"
)

// Request represents the jsonrpc2 request
type Request struct {
	Jsonrpc string      `json:"jsonrpc"`
	Method  string      `json:"method"`
	Params  interface{} `json:"params"`
	ID      uint64      `json:"id"`
}

// ReadIPC reads from a socket
func ReadIPC(r io.Reader, wg *sync.WaitGroup) {
	//20KB buffer
	buf := make([]byte, 20*1024)
	n, err := r.Read(buf[:])
	if err != nil {
		log.Fatal("Unable to read from socket", err)
	}
	fmt.Println("Ethereum node response: ", string(buf[0:n]))
	wg.Done()
}

func main() {
	var wg sync.WaitGroup
	socketfile := "/home/younix/testnet/chaindata/geth.ipc"

	// create a request
	params := make([]int, 0)
	request := &Request{
		Jsonrpc: "2.0",
		Method:  "eth_blockNumber",
		Params:  params,
		ID:      12345,
	}

	// marshal the struct to json string
	strRequest, err := json.Marshal(&request)
	if err != nil {
		log.Fatal("Unable to encode request", err)
	}

	// dial the socket
	ipc, err := net.Dial("unix", socketfile)
	if err != nil {
		log.Fatal("Unable to connect to the unix socket", err)
	}
	defer ipc.Close()

	// listen for incoming messages
	wg.Add(1)
	go ReadIPC(ipc, &wg)

	// write to the unix socket
	fmt.Println("Call procedure: ", request.Method)
	_, err = ipc.Write(strRequest)
	if err != nil {
		log.Fatal("Unable to write to the unix socket", err)
	}

	// wait for response
	wg.Wait()
}
