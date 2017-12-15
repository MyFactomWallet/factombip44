# FactomBIP44

[index.js:37-40](https://github.com/Emyrk/factombip44/blob/b1bf7bceace57f4eec7b3e11fb0888339341b3c8/index.js#L37-L40 "Source code on GitHub")

Creates a new HD wallet for factom from mnemonic

**Parameters**

-   `mnemonic` **String** 12 words

## generateEntryCreditPrivateKey

[index.js:49-56](https://github.com/Emyrk/factombip44/blob/b1bf7bceace57f4eec7b3e11fb0888339341b3c8/index.js#L49-L56 "Source code on GitHub")

Generate the 32byte Entry Credit private key for the pattern account/chain/address.

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting
-   `address` **int** Which address index in the chain to generate. Start at 0 and increment

Returns **Buffer** 32 byte Private key

## generateFactoidPrivateKey

[index.js:98-105](https://github.com/Emyrk/factombip44/blob/b1bf7bceace57f4eec7b3e11fb0888339341b3c8/index.js#L98-L105 "Source code on GitHub")

Generate the 32byte Factoid private key for the pattern account/chain/address.

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting
-   `address` **int** Which address index in the chain to generate. Start at 0 and increment

Returns **Buffer** 32 byte Private key

## getFactoidChain

[index.js:64-67](https://github.com/Emyrk/factombip44/blob/b1bf7bceace57f4eec7b3e11fb0888339341b3c8/index.js#L64-L67 "Source code on GitHub")

Get an address chain to not have to recompute the first 3 parts of the bip44 path

**Parameters**

-   `account` **int** Which account branch to take. Put 0 for defaulting
-   `chain` **int** Which chain branch to take. Put 0 for defaulting

Returns **Chain** A chain object, which you can call next() on.

# next

[index.js:85-89](https://github.com/Emyrk/factombip44/blob/b1bf7bceace57f4eec7b3e11fb0888339341b3c8/index.js#L85-L89 "Source code on GitHub")

Computes and returns the next private key in the chain

Returns **Buffer** Private key

# randomMnemonic

[index.js:20-22](https://github.com/Emyrk/factombip44/blob/b1bf7bceace57f4eec7b3e11fb0888339341b3c8/index.js#L20-L22 "Source code on GitHub")

Generates a random 12 word mnemonic seed

Returns **String** 12 word mnemonic

# validMnemonic

[index.js:29-31](https://github.com/Emyrk/factombip44/blob/b1bf7bceace57f4eec7b3e11fb0888339341b3c8/index.js#L29-L31 "Source code on GitHub")

Returns if the mnemoic is valid

**Parameters**

-   `mnemonic` **String** 12 words

Returns **boolean** true if valid
