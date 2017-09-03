# FactomBIP44

[index.js:42-45](https://github.com/MyFactomWallet/factombip44/blob/63e29438accf84c2793d65ae32642cf4d2a33b08/index.js#L42-L45 "Source code on GitHub")

Generate the 32byte Entry Credit private key for the pattern account/chain/address.

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting
-   `address` **int** Which address index in the chain to generate. Start at 0 and increment
-   `mnemonic`  

Returns **Buffer** 32 byte Private key

## generateEntryCreditPrivateKey

[index.js:54-61](https://github.com/MyFactomWallet/factombip44/blob/63e29438accf84c2793d65ae32642cf4d2a33b08/index.js#L54-L61 "Source code on GitHub")

Generate the 32byte Entry Credit private key for the pattern account/chain/address.

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting
-   `address` **int** Which address index in the chain to generate. Start at 0 and increment

Returns **Buffer** 32 byte Private key

## generateFactoidPrivateKey

[index.js:103-110](https://github.com/MyFactomWallet/factombip44/blob/63e29438accf84c2793d65ae32642cf4d2a33b08/index.js#L103-L110 "Source code on GitHub")

Generate the 32byte Factoid private key for the pattern account/chain/address.

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting
-   `address` **int** Which address index in the chain to generate. Start at 0 and increment

Returns **Buffer** 32 byte Private key

## getFactoidChain

[index.js:69-72](https://github.com/MyFactomWallet/factombip44/blob/63e29438accf84c2793d65ae32642cf4d2a33b08/index.js#L69-L72 "Source code on GitHub")

Get an address chain to not have to recompute the first 3 parts of the bip44 path

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting

Returns **Chain** A chain object, which you can call next() on.

# next

[index.js:90-94](https://github.com/MyFactomWallet/factombip44/blob/63e29438accf84c2793d65ae32642cf4d2a33b08/index.js#L90-L94 "Source code on GitHub")

Computes and returns the next private key in the chain

Returns **Buffer** Private key

# randomMnemonic

[index.js:20-22](https://github.com/MyFactomWallet/factombip44/blob/63e29438accf84c2793d65ae32642cf4d2a33b08/index.js#L20-L22 "Source code on GitHub")

Generates a random 12 word mnemonic seed

Returns **String** 12 word mnemonic

# validMnemonic

[index.js:31-33](https://github.com/MyFactomWallet/factombip44/blob/63e29438accf84c2793d65ae32642cf4d2a33b08/index.js#L31-L33 "Source code on GitHub")

Generate the 32byte Entry Credit private key for the pattern account/chain/address.

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting
-   `address` **int** Which address index in the chain to generate. Start at 0 and increment
-   `mnemonic`  

Returns **Buffer** 32 byte Private key
