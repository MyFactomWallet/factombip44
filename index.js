var bip39 = require('bip39')
var bitcoin = require('bitcoinjs-lib')
var bip32utils = require('bip32-utils')
const Buffer = require('safe-buffer').Buffer
const fctUtils = require('factomjs-util')

// https://github.com/crypto-browserify/randombytes
// var randomBytes = require('randombytes');

module.exports = {
  FactomBIP44,
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
 * Generate the 32byte Entry Credit private key for the pattern account/chain/address.
 * @param {int} account Which account branch to take. Put 0 for defaulting
 * @param {int} chain Which chain branch to take. Put 0 for defaulting
 * @param {int} address Which address index in the chain to generate. Start at 0 and increment
 * @return {Buffer} 32 byte Private key
 */
function validMnemonic (mnemonic) {
  return bip39.validateMnemonic(mnemonic)
}

/**
 * Generate the 32byte Entry Credit private key for the pattern account/chain/address.
 * @param {int} account Which account branch to take. Put 0 for defaulting
 * @param {int} chain Which chain branch to take. Put 0 for defaulting
 * @param {int} address Which address index in the chain to generate. Start at 0 and increment
 * @return {Buffer} 32 byte Private key
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
  var path = "m/44'/132'"
  var child = this.hdWallet.derivePath(path)
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
  var c = new Chain(this, account, chain, true)
  return c
}

function Chain (hd, account, chain, factoid) {
  this.index = 0
  var path = "m/44'/131'"
  if (!factoid) {
    var path = "m/44'/132'"
  }
  var child = hd.hdWallet.derivePath(path)
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
  var path = "m/44'/131'"
  var child = this.hdWallet.derivePath(path)
  child = child.deriveHardened(account)
    .derive(chain)
    .derive(address)
  return child.keyPair.d.toBuffer()
}
