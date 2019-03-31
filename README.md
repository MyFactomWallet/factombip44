# Factom Bip44

Generate addresses off your 12-word mnemonic seed. Same seed as EnterpriseWallet and factom-walletd.

There are faster ways to do this, but this gets the job done easily. It does a lot of computation more than once if you end up generating a lot of addresses.

# Example

```javascript
const bip44 = require("factombip44")
const { seedToPrivateFctAddress, getPublicAddress } = require("factom")

// Mnemonic seed
const mnemonic =
  "yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow"

// Create the wallet
const wallet = new bip44.FactomHDWallet({ mnemonic })

// Generating private keys. Typically you only need to increment the last parameter,
// unless you want to make multiple chains of addresses
const privKey1 = wallet.generateFactoidPrivateKey(0, 0, 0)
const privKey2 = wallet.generateFactoidPrivateKey(0, 0, 1)

// Get Fs... private human readable address
const humanPrivKey = seedToPrivateFctAddress(privKey1)

// Get Fa... public human readable address
const humanPubKey = getPublicAddress(humanPrivKey)
```

For random mnemonics

```javascript
// Generate a new mnemonic
const mn = bip44.randomMnemonic()

// You can validate it if you want to verify
const valid = bip44.validMnemonic(mn)
// valid == true because we generated. If user is inputting, if might not be valid
```

If you are generating many addresses in a row, doing the first example is slow. You can speed it up like so:

```javascript
const mnemonic =
  "yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow"
const wallet = new bip44.FactomHDWallet({ mnemonic })

// We will store all the keys here
const privateKeys = []

// This chain object saves us some computation for each new address
const chain = wallet.getFactoidChain(0, 0, 0)
for (let i = 0; i < 5; i++) {
  // This is the next key, we will throw it onto our array
  const next = chain.next()
  privateKeys.push(next)
}

// Lost the chain? Do it again
const chain = wallet.getFactoidChain(0, 0, 0)
// for (var i = 0; i < 5; i++) { ... }
```

Chains are the same as the generate, just quicker as the first set of computation is saved, so there is less work. They can only be generated sequentially though

```javascript
// The 'next()' refer to the next index in the generate function, so:
const chain = wallet.getFactoidChain(0, 0, 0)
chain.next() == wallet.generateFactoidPrivateKey(0, 0, 0)
chain.next() == wallet.generateFactoidPrivateKey(0, 0, 1)
chain.next() == wallet.generateFactoidPrivateKey(0, 0, 2)
// etc
```

# Precompiled for Web

Use `dist/factombip44.js` and use like so:

```javascript
// There is a require function to act similar to node
const bip44 = require("factombip44")

// Use like normal
const mn = bip44.randomMnemonic()
// ...
```

# Libraries

Bip39 : https://github.com/bitcoinjs/bip39
