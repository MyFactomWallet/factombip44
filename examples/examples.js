var bip44 = require('../index.js')
const fctUtils = require('factom/src/addresses')

// Mnemonic seed
var mn = 'yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow'


// Create the wallet
var wallet = new bip44.FactomBIP44(mn)

if ( bip44.validMnemonic(mn) ) console.log("VALID!!!!!!!!!!!!!!!!!!!!!!!")
else console.log("NOT VALID!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

// Generating private keys. Typically you only need to increment the last parameter,
// unless you want to make multiple chains of addresses
var privKey1 = wallet.generateFactoidPrivateKey(0, 0, 0)
var privKey2 = wallet.generateFactoidPrivateKey(0, 0, 1)

// Get Fs... private human readable address
var humanPrivKey1 = fctUtils.keyToPrivateFctAddress(privKey1)
var humanPrivKey2 = fctUtils.keyToPrivateFctAddress(privKey2)

// Get FA... public human readable address
var humanPubKey1 = fctUtils.getPublicAddress(humanPrivKey1)
var humanPubKey2 = fctUtils.getPublicAddress(humanPrivKey2)
console.log(humanPubKey1)
console.log(humanPubKey2)

