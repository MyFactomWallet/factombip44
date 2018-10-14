# FactomBIP44

[index.js:46-49](https://github.com/MyFactomWallet/factombip44/blob/5f88384cac608a1c4499c6aa6b56c520ff9400a6/index.js#L46-L49 "Source code on GitHub")

Creates a new HD wallet for factom from mnemonic

**Parameters**

-   `mnemonic` **String** 12 words

## generateEntryCreditPrivateKey

[index.js:58-64](https://github.com/MyFactomWallet/factombip44/blob/5f88384cac608a1c4499c6aa6b56c520ff9400a6/index.js#L58-L64 "Source code on GitHub")

Generate the 32byte Entry Credit private key for the pattern account/chain/address.

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting
-   `address` **int** Which address index in the chain to generate. Start at 0 and increment

Returns **Buffer** 32 byte Private key

## generateFactoidPrivateKey

[index.js:121-127](https://github.com/MyFactomWallet/factombip44/blob/5f88384cac608a1c4499c6aa6b56c520ff9400a6/index.js#L121-L127 "Source code on GitHub")

Generate the 32byte Factoid private key for the pattern account/chain/address.

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting
-   `address` **int** Which address index in the chain to generate. Start at 0 and increment

Returns **Buffer** 32 byte Private key

## generateIdentityPrivateKey

[index.js:74-80](https://github.com/MyFactomWallet/factombip44/blob/5f88384cac608a1c4499c6aa6b56c520ff9400a6/index.js#L74-L80 "Source code on GitHub")

Generate the 32byte Identity private key for the pattern account/chain/address.

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting
-   `address` **int** Which address index in the chain to generate. Start at 0 and increment

Returns **Buffer** 32 byte Private key

## getFactoidChain

[index.js:88-91](https://github.com/MyFactomWallet/factombip44/blob/5f88384cac608a1c4499c6aa6b56c520ff9400a6/index.js#L88-L91 "Source code on GitHub")

Get an address chain to not have to recompute the first 3 parts of the bip44 path

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting

Returns **Chain** A chain object, which you can call next() on.

# next

[index.js:108-112](https://github.com/MyFactomWallet/factombip44/blob/5f88384cac608a1c4499c6aa6b56c520ff9400a6/index.js#L108-L112 "Source code on GitHub")

Computes and returns the next private key in the chain

Returns **Buffer** Private key

# randomMnemonic

[index.js:29-31](https://github.com/MyFactomWallet/factombip44/blob/5f88384cac608a1c4499c6aa6b56c520ff9400a6/index.js#L29-L31 "Source code on GitHub")

Generates a random 12 word mnemonic seed

Returns **String** 12 word mnemonic

# validMnemonic

[index.js:38-40](https://github.com/MyFactomWallet/factombip44/blob/5f88384cac608a1c4499c6aa6b56c520ff9400a6/index.js#L38-L40 "Source code on GitHub")

Returns if the mnemoic is valid

**Parameters**

-   `mnemonic` **String** 12 words

Returns **boolean** true if valid
