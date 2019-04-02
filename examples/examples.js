const bip44 = require("../index.js")
const fctUtils = require("factom/src/addresses")
const fctUtilsId = require("factom-vote/src/factom-identity")
const { Entry } = require("factom/src/entry")

const { Chain, composeChain } = require("factom/src/chain")

// Mnemonic seed
const mnemonic =
  "yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow"

// Create the wallet
const wallet = new bip44.FactomHDWallet({ mnemonic })

if (bip44.validMnemonic(mnemonic)) console.log("Valid Mnemonic!")
else console.log("Invalid Mnemonic!")

// Generating private keys. Typically you only need to increment the last parameter,
// unless you want to make multiple chains of addresses
var privKey1 = wallet.generateFactoidPrivateKey(0, 0, 0)
var privKey2 = wallet.generateFactoidPrivateKey(0, 0, 1)

var privEcKey1 = wallet.generateEntryCreditPrivateKey(0, 0, 0)

// Get Fs... private human readable address
var humanPrivKey1 = fctUtils.seedToPrivateFctAddress(privKey1)
var humanPrivKey2 = fctUtils.seedToPrivateFctAddress(privKey2)

// Get FA... public human readable address
var humanPubKey1 = fctUtils.getPublicAddress(humanPrivKey1)
var humanPubKey2 = fctUtils.getPublicAddress(humanPrivKey2)

// Get EC addresses
var humanEcPrivKey1 = fctUtils.seedToPrivateEcAddress(privEcKey1)
var humanEcPubKey1 = fctUtils.getPublicAddress(humanEcPrivKey1)

console.log("------------------------------------------")
console.log("FCT Address 1: m/44'/131'/0'/0/0")
console.log(humanPubKey1)
console.log(humanPrivKey1)
console.log("------------------------------------------")
console.log("FCT Address 2: m/44'/131'/0'/0/1")
console.log(humanPubKey2)
console.log(humanPrivKey2)

console.log("------------------------------------------")
console.log("Entry Credit : m/44'/132'/0'/0/0")
console.log(humanEcPubKey1)
console.log(humanEcPrivKey1)

var privKeyIdentity = wallet.generateIdentityPrivateKey(0, 0, 0)
var privKeyIdentity2 = wallet.generateIdentityPrivateKey(0, 0, 1)
var humanPrivKeyIdentity = fctUtilsId.keyToSecretIdentityKey(privKeyIdentity)
var humanPrivKeyIdentity2 = fctUtilsId.keyToSecretIdentityKey(privKeyIdentity2)
var humanPubKeyIdentity = fctUtilsId.getPublicIdentityKey(humanPrivKeyIdentity)
var humanPubKeyIdentity2 = fctUtilsId.getPublicIdentityKey(humanPrivKeyIdentity2)

console.log("------------------------------------------")
console.log("Identity1 : m/44'/281'/0'/0/0")
console.log(humanPubKeyIdentity)
console.log(humanPrivKeyIdentity)
console.log("------------------------------------------")
console.log("Identity2 : m/44'/281'/0'/0/1")
console.log(humanPubKeyIdentity2)
console.log(humanPrivKeyIdentity2)
console.log("------------------------------------------")

const cont = {
  "identity-version": 1,
  keys: [humanPubKeyIdentity, humanPubKeyIdentity2]
}

console.log("------------------------------------------")
console.log(cont)
console.log("------------------------------------------")

const entry = Entry.builder()
  .extId("IdentityChain", "utf8")
  .extId("John", "utf8")
  .extId("Doe", "utf8")
  .content(JSON.stringify(cont), "utf8")
  .build()

const chain = new Chain(entry)
const compose = composeChain(chain, humanEcPrivKey1)

console.log("------------------COMMIT------------------")
console.log(compose.commit.toString("hex"))
console.log("------------------------------------------")
console.log("------------------REVEAL------------------")
console.log(compose.reveal.toString("hex"))
console.log("------------------------------------------")
