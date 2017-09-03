# Factom Bip44

Generate addresses off your 12 word seed. Same seed as EnterpriseWallet and factom-walletd.

There are faster ways to do this, but this gets the job done easily. It does a lot of computation more than once if you end up generating a lot of addresses.

# Example

The two factom packages used in the examples. `bip44` is __this__ repo

```javascript
var bip44 = require('factombip44')
const fctUtils = require('factomjs-util')
```

```javascript
// Mnemonic seed
var mn = 'yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow'

// Create the wallet
var wallet = new bip44.FactomBIP44(mn)

// Generating private keys. Typically you only need to increment the last parameter,
// unless you want to make multiple chains of addresses
var privKey1 = fctUtils.bufferToHex(wallet.generateFactoidPrivateKey(0, 0, 0))
var privKey2 = fctUtils.bufferToHex(wallet.generateFactoidPrivateKey(0, 0, 1))

// Get Fs... private human readable address
var humanPrivKey = fctUtils.privateFactoidKeyToHumanAddress(privKey1)

// Get Fa... public human readable address
var humanPubKey = fctUtils.publicFactoidKeyToHumanAddress(fctUtils.privateKeyToPublicKey(privKey1))

```

For random mnemonics

```javascript
// Generate a new mnemonic
var mn = bip44.randomMnemonic()

// You can validate it if you want to verify
var valid = bip44.validMnemonic(mn)
// valid == true because we generated. If user is inputting, if might not be valid
```

If you are generating many addresses in a row, doing the first example is slow. You can speed it up like so:
```javascript
var mn = 'yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow'
var wallet = new bip44.FactomBIP44(mn)

// We will store all the keys here
var privateKeys = []

// This chain object saves us some computation for each new address
var chain = wallet.getFactoidChain(0, 0)
for (var i = 0; i < 5; i++) {
	// This is the next key, we will throw it onto our array
	var next = chain.next()
	privateKeys.push(fctUtils.bufferToHex(next))
}

// Lost the chain? Do it again
var chain = wallet.getFactoidChain(0, 0)
// for (var i = 0; i < 5; i++) { ... }
```

Chains are the same as the generate, just quicker as the first set of computation is saved, so there is less work. They can only be generated sequentially though

```javascript
// The 'next()' refer to the next index in the generate function, so:
var chain = wallet.getFactoidChain(0, 0)
chain.next() == wallet.generateFactoidPrivateKey(0, 0, 0)
chain.next() == wallet.generateFactoidPrivateKey(0, 0, 1)
chain.next() == wallet.generateFactoidPrivateKey(0, 0, 2)
// etc
```

# Precompiled for Web

Use `dist/factombip44.js` and use like so:
```javascript
// There is a require function to act similar to node
var bip44 = require('factombip44');

// Use like normal
var mn = bip44.randomMnemonic()
// ...
```


# Libraries

Bip39 : https://github.com/bitcoinjs/bip39

