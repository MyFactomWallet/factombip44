var bip39 = require('bip39')
var bitcoin = require('bitcoinjs-lib')
var bip32utils = require('bip32-utils')
const Buffer = require('safe-buffer').Buffer

// https://github.com/crypto-browserify/randombytes
// var randomBytes = require('randombytes');

const CoinTypeEnum = Object.freeze({"fct":1, "ec":2, "id":3 })

const FactomHDPath = new Map([
  [CoinTypeEnum.fct, "m/44'/131'"],
  [CoinTypeEnum.ec,  "m/44'/132'"],
  [CoinTypeEnum.id,  "m/44'/143165576'"]
])

module.exports = {
  FactomBIP44,
  CoinTypeEnum,
  FactomHDPath,
  randomMnemonic,
  validMnemonic
}

/**
 * Generates a random 12 word mnemonic seed
 * @return {String} 12 word mnemonic
 */
function randomMnemonic () {
  return bip39.generateMnemonic()
}

/**
 * Returns if the mnemoic is valid
 * @param  {String} mnemonic 12 words
 * @return {boolean}          true if valid
 */
function validMnemonic (mnemonic) {
  return bip39.validateMnemonic(mnemonic)
}

/**
 * Creates a new HD wallet for factom from mnemonic
 * @param {String} mnemonic 12 words
 */
function FactomBIP44 (mnemonic) {
  var seed = bip39.mnemonicToSeedHex(mnemonic)
  this.hdWallet = bitcoin.HDNode.fromSeedHex(seed)
}

/**
 * Generate the 32byte Entry Credit private key for the pattern account/chain/address.
 * @param {int} account Which account branch to take. Put 0 for defaulting
 * @param {int} chain Which chain branch to take. Put 0 for defaulting
 * @param {int} address Which address index in the chain to generate. Start at 0 and increment
 * @return {Buffer} 32 byte Private key
 */
FactomBIP44.prototype.generateEntryCreditPrivateKey = function (account, chain, address) {
  var child = this.hdWallet.derivePath(FactomHDPath.get(CoinTypeEnum.ec))
  child = child.deriveHardened(account)
    .derive(chain)
    .derive(address)
  return child.keyPair.d.toBuffer()
}


/**
 * Generate the 32byte Identity private key for the pattern account/chain/address.
 * @param {int} account Which account branch to take. Put 0 for defaulting
 * @param {int} chain Which chain branch to take. Put 0 for defaulting
 * @param {int} address Which address index in the chain to generate. Start at 0 and increment
 * @return {Buffer} 32 byte Private key
 */
FactomBIP44.prototype.generateIdentityPrivateKey = function (account, chain, address) {
  var child = this.hdWallet.derivePath(FactomHDPath.get(CoinTypeEnum.id))
  child = child.deriveHardened(account)
    .derive(chain)
    .derive(address)
  return child.keyPair.d.toBuffer()
}

/**
 * Get an address chain to not have to recompute the first 3 parts of the bip44 path
 * @param {int} account Which account branch to take. Put 0 for defaulting
 * @param {int} chain Which chain branch to take. Put 0 for defaulting
 * @return {Chain} A chain object, which you can call next() on.
 */
FactomBIP44.prototype.getFactoidChain = function (account, chain) {
  var c = new Chain(this, account, chain, CoinTypeEnum.fct)
  return c
}

function Chain (hd, account, chain, coinenum) {
  this.index = 0
  if ( coinenum <= 0 || coinenum > FactomHDPath.size ) {
      throw new Error("Chain derivation error: Invalid coin type")
  }
  var child = hd.hdWallet.derivePath(FactomHDPath.get(coinenum))
  child = child.deriveHardened(account)
    .derive(chain)
  this.child = child
}

/**
 * Computes and returns the next private key in the chain
 * @return {Buffer} Private key
 */
Chain.prototype.next = function () {
  next = this.child.derive(this.index)
  this.index++
  return next.keyPair.d.toBuffer()
}

/**
 * Generate the 32byte Factoid private key for the pattern account/chain/address.
 * @param {int} account Which account branch to take. Put 0 for defaulting
 * @param {int} chain Which chain branch to take. Put 0 for defaulting
 * @param {int} address Which address index in the chain to generate. Start at 0 and increment
 * @return {Buffer} 32 byte Private key
 */
FactomBIP44.prototype.generateFactoidPrivateKey = function (account, chain, address) {
  var child = this.hdWallet.derivePath(FactomHDPath.get(CoinTypeEnum.fct))
  child = child.deriveHardened(account)
    .derive(chain)
    .derive(address)
  return child.keyPair.d.toBuffer()
}
