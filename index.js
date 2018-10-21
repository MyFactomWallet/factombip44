var bip39 = require('bip39')
const { derivePath, getMasterKeyFromSeed, getPublicKey } = require('ed25519-hd-key')
const Buffer = require('safe-buffer').Buffer


// https://github.com/crypto-browserify/randombytes
// var randomBytes = require('randombytes');

const CoinTypeEnum = Object.freeze({"fct":1, "ec":2, "id":3 })

const FactomHDPath = new Map([
  [CoinTypeEnum.fct, { "prefix" : "m/44'/131'" , "type" : 131 } ],
  [CoinTypeEnum.ec,  { "prefix" : "m/44'/132'" , "type" : 132 } ],
  [CoinTypeEnum.id,  { "prefix" : "m/44'/143165576'", "type" : 143165576 } ]
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
  this.seed = bip39.mnemonicToSeed(mnemonic).toString('hex')
}

function buildPath(coin, account, chain, address)
{
  let path = FactomHDPath.get(coin).prefix + "/" + 
		account.toString() + "'/" + chain.toString() + "'/" + address.toString() + "'"

  console.log(path)
  return path
}

/**
 * Generate the 32byte Entry Credit private key for the pattern account/chain/address.
 * @param {int} account Which account branch to take. Put 0 for defaulting
 * @param {int} chain Which chain branch to take. Put 0 for defaulting
 * @param {int} address Which address index in the chain to generate. Start at 0 and increment
 * @return {Buffer} 32 byte Private key
 */
FactomBIP44.prototype.generateEntryCreditPrivateKey = function (account, chain, address) {
  let path = buildPath(CoinTypeEnum.ec, account, chain, address)
  const { key, chainCode } = derivePath(path, this.seed)
  return key
}


/**
 * Generate the 32byte Identity private key for the pattern account/chain/address.
 * @param {int} account Which account branch to take. Put 0 for defaulting
 * @param {int} chain Which chain branch to take. Put 0 for defaulting
 * @param {int} address Which address index in the chain to generate. Start at 0 and increment
 * @return {Buffer} 32 byte Private key
 */
FactomBIP44.prototype.generateIdentityPrivateKey = function (account, chain, address) {
  let path = buildPath(CoinTypeEnum.id, account, chain, address)
  const { key, chainCode } = derivePath(path, seed)
  return key
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

  this.coinenum = coinenum
  this.hd = hd.seed
  this.account = account
  this.chain = chain
  let path = buildPath(this.coinenum, this.account, this.chain, this.index)
  const { key, chainCode } = derivePath(path, hd.toString('hex'))
  this.key = key
  this.chainCode = chainCode
}

/**
 * Computes and returns the next private key in the chain
 * @return {Buffer} Private key
 */
Chain.prototype.next = function () {
//  next = this.child.derive(this.index)
  this.index++
  let path = buildPath(this.coinenum, this.account, this.chain, this.index)
  const { key, chainCode } = derivePath(path, this.hd.toString('hex'))
  this.key = key
  this.chainCode = chainCode
  return key
}

/**
 * Generate the 32byte Factoid private key for the pattern account/chain/address.
 * @param {int} account Which account branch to take. Put 0 for defaulting
 * @param {int} chain Which chain branch to take. Put 0 for defaulting
 * @param {int} address Which address index in the chain to generate. Start at 0 and increment
 * @return {Buffer} 32 byte Private key
 */
FactomBIP44.prototype.generateFactoidPrivateKey = function (account, chain, address) {
  let path = buildPath(CoinTypeEnum.fct, account,chain, address)
  const { key, chainCode }  = derivePath(path, this.seed)
  return key 
}

