# FactomBIP44

[index.js:48-51](https://github.com/MyFactomWallet/factombip44/blob/a43ff6d62f0fab889258b22348c6a18df017d199/index.js#L48-L51 "Source code on GitHub")

Creates a new HD wallet for factom from mnemonic

**Parameters**

-   `mnemonic` **String** 12 words

## generateEntryCreditPrivateKey

[index.js:60-66](https://github.com/MyFactomWallet/factombip44/blob/a43ff6d62f0fab889258b22348c6a18df017d199/index.js#L60-L66 "Source code on GitHub")

Generate the 32byte Entry Credit private key for the pattern account/chain/address.

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting
-   `address` **int** Which address index in the chain to generate. Start at 0 and increment

Returns **Buffer** 32 byte Private key

## generateFactoidPrivateKey

[index.js:123-129](https://github.com/MyFactomWallet/factombip44/blob/a43ff6d62f0fab889258b22348c6a18df017d199/index.js#L123-L129 "Source code on GitHub")

Generate the 32byte Factoid private key for the pattern account/chain/address.

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting
-   `address` **int** Which address index in the chain to generate. Start at 0 and increment

Returns **Buffer** 32 byte Private key

## generateIdentityPrivateKey

[index.js:76-82](https://github.com/MyFactomWallet/factombip44/blob/a43ff6d62f0fab889258b22348c6a18df017d199/index.js#L76-L82 "Source code on GitHub")

Generate the 32byte Identity private key for the pattern account/chain/address.

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting
-   `address` **int** Which address index in the chain to generate. Start at 0 and increment

Returns **Buffer** 32 byte Private key

## getFactoidChain

[index.js:90-93](https://github.com/MyFactomWallet/factombip44/blob/a43ff6d62f0fab889258b22348c6a18df017d199/index.js#L90-L93 "Source code on GitHub")

Get an address chain to not have to recompute the first 3 parts of the bip44 path

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting

Returns **Chain** A chain object, which you can call next() on.

# next

[index.js:110-114](https://github.com/MyFactomWallet/factombip44/blob/a43ff6d62f0fab889258b22348c6a18df017d199/index.js#L110-L114 "Source code on GitHub")

Computes and returns the next private key in the chain

Returns **Buffer** Private key

# randomMnemonic

[index.js:31-33](https://github.com/MyFactomWallet/factombip44/blob/a43ff6d62f0fab889258b22348c6a18df017d199/index.js#L31-L33 "Source code on GitHub")

Generates a random 12 word mnemonic seed

Returns **String** 12 word mnemonic

# validMnemonic

[index.js:40-42](https://github.com/MyFactomWallet/factombip44/blob/a43ff6d62f0fab889258b22348c6a18df017d199/index.js#L40-L42 "Source code on GitHub")

Returns if the mnemoic is valid

**Parameters**

-   `mnemonic` **String** 12 words

Returns **boolean** true if valid
