var bip44 = require('../index.js')
const fctUtils = require('factom/src/addresses')

// Mnemonic seed
var mn = 'yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow'


// Create the wallet
var wallet = new bip44.FactomBIP44(mn)

// Generating private keys. Typically you only need to increment the last parameter,
// unless you want to make multiple chains of addresses
var privKey1 = wallet.generateFactoidPrivateKey(0, 0, 0).toString('hex')
var privKey2 = wallet.generateFactoidPrivateKey(0, 0, 1).toString('hex')

// Get Fs... private human readable address
var humanPrivKey1 = fctUtils.keyToPrivateFctAddress(privKey1)

// Get FA... public human readable address
var humanPubKey1 = fctUtils.getPublicAddress(humanPrivKey1)
console.log(humanPubKey1)
