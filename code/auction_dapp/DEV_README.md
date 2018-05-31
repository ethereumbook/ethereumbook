# Configuring truffle
Guide to properly configure truffle to build and deploy contracts to the network


## Add local testnet

Edit `truffle.js` :

```
  networks: {
    development: {
      host: "",
      port: 8545,
      network_id: "*",
      gas: 2900000
    }
  }
```

## Commands

```
$ truffle init #initialize truffle project
$ truffle console
$ truffle deploy
$ truffle migrate --reset --compile-all #redeploy the smat contracts

```

## Errors
Here is a list of possible errors:

## ParserError: Expected token Semicolon got 'LParen'

Emitting events gives compilation error if solc-js not 0.4.21
Update truffle using:

```
$ cd /usr/lib/node_modules/truffle
$ npm install solc@0.4.21 --save
```

### Account is locked/Auth needed

```
$ truffle console
truffle(development)> var acc = web3.eth.accounts[0]
truffle(development)> web3.personal.unlockAccount(acc, 'pass', 36000)
```

Then deploy. Repeat the step when needed

### Intrinsic gas too low

```
$ truffle console
truffle(development)> web3.eth.getBlock("pending").gasLimit
xxxxxxx
```

edit truffle.js

```
    development: {
        ...
        gas: xxxxxxxxx,
        network_id: "*"
    }
```
