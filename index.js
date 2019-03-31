const bip39 = require('bip39')
const bip32 = require('bip32')

const { inherits } = require('util')
const Buffer = require('safe-buffer').Buffer

const CoinTypeEnum = Object.freeze({"fct":1, "ec":2, "id":3 })

const FactomHDPath = new Map([
  [CoinTypeEnum.fct, "m/44'/131'"],
  [CoinTypeEnum.ec,  "m/44'/132'"],
  [CoinTypeEnum.id,  "m/44'/281'"]
])

module.exports = {
  FactomBIP44,
  FactomHDWallet,
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

function FactomHDWallet(options) {
  const opts = typeof options === 'object' ? options : {}
  let seed
  if (opts.mnemonic) {
    const passwd = opts.passphrase || ''
    seed = bip39.mnemonicToSeed(opts.mnemonic, passwd)
  } else if (opts.seed) {
    seed = Buffer.from(opts.seed, 'hex')
  } else {
    throw new Error('Invalid initialization of the FactomHDWallet: missing seed or mnemonic')
  }
  this.hdWallet = bip32.fromSeed(seed)
}

/**
 * Creates a new HD wallet for factom from mnemonic
 * @deprecated
 * @param {String} mnemonic 12 words
 * @param  {String} (optional) passprase
 */
function FactomBIP44 (mnemonic, passphrase) {
  FactomHDWallet.call(this, { mnemonic, passphrase });
}

inherits(FactomBIP44, FactomHDWallet);

/**
 * Generate the 32byte Factoid private key for the pattern account/chain/address.
 * @param {int} account Which account branch to take. Put 0 for defaulting
 * @param {int} chain Which chain branch to take. Put 0 for defaulting
 * @param {int} address Which address index in the chain to generate. Start at 0 and increment
 * @return {Buffer} 32 byte Private key
 */
FactomHDWallet.prototype.generateFactoidPrivateKey = function (account, chain, address) {
  let child = this.hdWallet.derivePath(FactomHDPath.get(CoinTypeEnum.fct))
  child = child.deriveHardened(account)
    .derive(chain)
    .derive(address)
  return child.privateKey
}

/**
 * Generate the 32byte Entry Credit private key for the pattern account/chain/address.
 * @param {int} account Which account branch to take. Put 0 for defaulting
 * @param {int} chain Which chain branch to take. Put 0 for defaulting
 * @param {int} address Which address index in the chain to generate. Start at 0 and increment
 * @return {Buffer} 32 byte Private key
 */
FactomHDWallet.prototype.generateEntryCreditPrivateKey = function (account, chain, address) {
  let child = this.hdWallet.derivePath(FactomHDPath.get(CoinTypeEnum.ec))
  child = child.deriveHardened(account)
    .derive(chain)
    .derive(address)
  return child.privateKey
}


/**
 * Generate the 32byte Identity private key for the pattern account/chain/address.
 * @param {int} account Which account branch to take. Put 0 for defaulting
 * @param {int} chain Which chain branch to take. Put 0 for defaulting
 * @param {int} address Which address index in the chain to generate. Start at 0 and increment
 * @return {Buffer} 32 byte Private key
 */
FactomHDWallet.prototype.generateIdentityPrivateKey = function (account, chain, address) {
  let child = this.hdWallet.derivePath(FactomHDPath.get(CoinTypeEnum.id))
  child = child.deriveHardened(account)
    .derive(chain)
    .derive(address)
  return child.privateKey
}

/**
 * Get an address chain for Factoid addresses to not have to recompute the first 3 parts of the bip44 path
 * @param {int} account Which account branch to take. Put 0 for defaulting
 * @param {int} chain Which chain branch to take. Put 0 for defaulting
 * @return {Chain} A chain object, which you can call next() on.
 */
FactomHDWallet.prototype.getFactoidChain = function (account, chain) {
  return new Chain(this, account, chain, CoinTypeEnum.fct)
}

/**
 * Get an address chain for Entry Credit addresses to not have to recompute the first 3 parts of the bip44 path
 * @param {int} account Which account branch to take. Put 0 for defaulting
 * @param {int} chain Which chain branch to take. Put 0 for defaulting
 * @return {Chain} A chain object, which you can call next() on.
 */
FactomHDWallet.prototype.getEntryCreditChain = function (account, chain) {
  return new Chain(this, account, chain, CoinTypeEnum.ec)
}

/**
 * Get an address chain for Identity keys to not have to recompute the first 3 parts of the bip44 path
 * @param {int} account Which account branch to take. Put 0 for defaulting
 * @param {int} chain Which chain branch to take. Put 0 for defaulting
 * @return {Chain} A chain object, which you can call next() on.
 */
FactomHDWallet.prototype.getIdentityChain = function (account, chain) {
  return new Chain(this, account, chain, CoinTypeEnum.id)
}

function Chain (hd, account, chain, coinenum) {
  this.index = 0
  if ( coinenum <= 0 || coinenum > FactomHDPath.size ) {
      throw new Error("Chain derivation error: Invalid coin type")
  }
  let child = hd.hdWallet.derivePath(FactomHDPath.get(coinenum))
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
  return next.privateKey
}
