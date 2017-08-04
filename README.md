# Factom Bip44

Generate addresses off your 12 word seed. Same seed as EnterpriseWallet and factom-walletd.

There are faster ways to do this, but this gets the job done easily. It does a lot of computation more than once if you end up generating a lot of addresses.

# Example

```javascript
var bip44 = require('../index.js')
const fctUtils = require('factomjs-util')

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

# Libraries

Bip39 : https://github.com/bitcoinjs/bip39

