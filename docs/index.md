# FactomBIP44

[index.js:46-48](https://github.com/MyFactomWallet/factombip44/blob/e87408dd8f99cd99349895941b3297a4752d00e6/index.js#L46-L48 "Source code on GitHub")

Creates a new HD wallet for factom from mnemonic

**Parameters**

-   `mnemonic` **String** 12 words

## generateEntryCreditPrivateKey

[index.js:66-70](https://github.com/MyFactomWallet/factombip44/blob/e87408dd8f99cd99349895941b3297a4752d00e6/index.js#L66-L70 "Source code on GitHub")

Generate the 32byte Entry Credit private key for the pattern account/chain/address.

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting
-   `address` **int** Which address index in the chain to generate. Start at 0 and increment

Returns **Buffer** 32 byte Private key

## generateFactoidPrivateKey

[index.js:135-139](https://github.com/MyFactomWallet/factombip44/blob/e87408dd8f99cd99349895941b3297a4752d00e6/index.js#L135-L139 "Source code on GitHub")

Generate the 32byte Factoid private key for the pattern account/chain/address.

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting
-   `address` **int** Which address index in the chain to generate. Start at 0 and increment

Returns **Buffer** 32 byte Private key

## generateIdentityPrivateKey

[index.js:80-84](https://github.com/MyFactomWallet/factombip44/blob/e87408dd8f99cd99349895941b3297a4752d00e6/index.js#L80-L84 "Source code on GitHub")

Generate the 32byte Identity private key for the pattern account/chain/address.

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting
-   `address` **int** Which address index in the chain to generate. Start at 0 and increment

Returns **Buffer** 32 byte Private key

## getFactoidChain

[index.js:93-96](https://github.com/MyFactomWallet/factombip44/blob/e87408dd8f99cd99349895941b3297a4752d00e6/index.js#L93-L96 "Source code on GitHub")

Get an address chain to not have to recompute the first 3 parts of the bip44 path

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting

Returns **Chain** A chain object, which you can call next() on.

# next

[index.js:118-126](https://github.com/MyFactomWallet/factombip44/blob/e87408dd8f99cd99349895941b3297a4752d00e6/index.js#L118-L126 "Source code on GitHub")

Computes and returns the next private key in the chain

Returns **Buffer** Private key

# randomMnemonic

[index.js:29-31](https://github.com/MyFactomWallet/factombip44/blob/e87408dd8f99cd99349895941b3297a4752d00e6/index.js#L29-L31 "Source code on GitHub")

Generates a random 12 word mnemonic seed

Returns **String** 12 word mnemonic

# validMnemonic

[index.js:38-40](https://github.com/MyFactomWallet/factombip44/blob/e87408dd8f99cd99349895941b3297a4752d00e6/index.js#L38-L40 "Source code on GitHub")

Returns if the mnemoic is valid

**Parameters**

-   `mnemonic` **String** 12 words

Returns **boolean** true if valid
