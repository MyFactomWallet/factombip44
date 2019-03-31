#!/usr/bin/env node

let firstid = 0
let lastid = 0

let key_ids = []
process.argv.forEach(function (val, index, array) {
      if ( val === "--first" ) firstid = index+1
      if ( val === "--last" ) lastid = index+1
      if ( val === '--key' ) key_ids.push(index+1)
});


let firstname = "unk"
let lastname = "unk" 
if ( firstid != 0 ) {
     firstname = process.argv[firstid]
}

if ( lastid != 0 ) {
    lastname = process.argv[lastid]
}

let cont2 = {
   'identity-version': 1,
   'keys': []
};

let havekeys = false
key_ids.forEach(function (val, index, array) {
    cont2['keys'].push(process.argv[val])
    havekeys = true
})

if ( !havekeys || !lastid || !firstid )
{
  console.log("Usage: example/regid.js --first Jane --last Doe --key idpub --key idpub2 --key idpub3")
  process.exit(1)
}	

console.log(firstname)
console.log(lastname)

var bip44 = require('../index.js')
const fctUtils = require('factom/src/addresses')
const fctUtilsId = require('factom-vote/src/factom-identity')
const { Entry } = require('factom/src/entry')
const sign = require('tweetnacl/nacl-fast').sign
const { add } = require('factom/src/add')
const { commitChain, revealChain } = require('factom/src/add')
const { FactomCli } = require('factom/src/factom-cli')
const { Chain, composeChainCommit, composeChainReveal, composeChain, composeChainLedger, computeChainTxId } = require('factom/src/chain')


const cli = new FactomCli({
 factomd: {
         host: 'api.myfactomwallet.com',
         port: 8288,
         //host: 'api.factomd.net',
         //port: 443,
         protocol: 'https'
 }
})

// Mnemonic seed
var mnemonic = 'yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow'


// Create the wallet
var wallet = new bip44.FactomHDWallet({mnemonic})

//if ( bip44.validMnemonic(mnemonic) ) console.log("Valid Mneumonic!")
//else console.log("Invalid Mneumonic!")


// Generating private keys. Typically you only need to increment the last parameter,
// unless you want to make multiple chains of addresses
/*
var privKey1 = wallet.generateFactoidPrivateKey(0, 0, 0)
var privKey2 = wallet.generateFactoidPrivateKey(0, 0, 1)
*/

var privEcKey1 = wallet.generateEntryCreditPrivateKey(0, 0, 0)

/*
// Get Fs... private human readable address
var humanPrivKey1 = fctUtils.seedToPrivateFctAddress(privKey1)
var humanPrivKey2 = fctUtils.seedToPrivateFctAddress(privKey2)


// Get FA... public human readable address
var humanPubKey1 = fctUtils.getPublicAddress(humanPrivKey1)
var humanPubKey2 = fctUtils.getPublicAddress(humanPrivKey2)

*/
// Get EC addresses
var humanEcPrivKey1 = fctUtils.seedToPrivateEcAddress(privEcKey1)
var humanEcPubKey1 = fctUtils.getPublicAddress(humanEcPrivKey1)

/*
console.log('------------------------------------------')
console.log("FCT Address 1: m/44'/131'/0'/0/0")
console.log(humanPubKey1)
console.log(humanPrivKey1)
console.log('------------------------------------------')
console.log("FCT Address 2: m/44'/131'/0'/0/1")
console.log(humanPubKey2)
console.log(humanPrivKey2)
*/

console.log('------------------------------------------')
console.log("Entry Credit : m/44'/132'/0'/0/0")
console.log(humanEcPubKey1)
console.log(humanEcPrivKey1)
console.log('------------------------------------------')

/*
var privKeyIdentity0 = wallet.generateIdentityPrivateKey(0,1,0)
var privKeyIdentity1 = wallet.generateIdentityPrivateKey(0,1,1)

var humanPrivKeyIdentity0 = fctUtilsId.keyToSecretIdentityKey(privKeyIdentity0)
var humanPrivKeyIdentity1 = fctUtilsId.keyToSecretIdentityKey(privKeyIdentity1)

var humanPubKeyIdentity0 = fctUtilsId.getPublicIdentityKey(humanPrivKeyIdentity0)
var humanPubKeyIdentity1 = fctUtilsId.getPublicIdentityKey(humanPrivKeyIdentity1)
*/

	/*
console.log('------------------------------------------')
console.log("Identity1 : m/44'/143165576'/0'/1/0")
console.log(humanPubKeyIdentity0)
console.log(humanPrivKeyIdentity0)
console.log('------------------------------------------')
console.log("Identity2 : m/44'/143165576'/0'/1/1")
console.log(humanPubKeyIdentity1)
console.log(humanPrivKeyIdentity1)
console.log('------------------------------------------')

const cont = {
   'identity-version': 1,
   'keys': [humanPubKeyIdentity0,humanPubKeyIdentity1]
};

console.log('------------------------------------------')
console.log(cont)
console.log('------------------------------------------')
	*/

const entry = Entry.builder()
  .extId('IdentityChain', 'utf8')
  .extId(firstname, 'utf8')
  .extId(lastname, 'utf8')
  .content(JSON.stringify(cont2),'utf8')
  .build();


const chain = new Chain(entry);
/*
const compose = composeChain(chain, humanEcPrivKey1);


console.log()
console.log('COMMIT="\\"\\')
console.log(compose.commit.toString('hex'))
console.log()
console.log('REVEAL="\\"\\')
console.log(compose.reveal.toString('hex'))
console.log()
*/




async function ls() {
  console.log('submitting commit chain')
	
  const com = await cli.commitChain(chain, humanEcPrivKey1)

  console.log('submitting reveal chain')
  const rev = await cli.revealChain(chain, humanEcPrivKey1)

  console.log('------------------------------------------')
  console.log(cont2)
  console.log('com', com);
  console.log('rev', rev);
}


ls();
