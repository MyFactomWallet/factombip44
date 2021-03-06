const assert = require("assert")
const bip44 = require("../index.js")
const fctUtils = require("factom/src/addresses")
const fctUtilsId = require("factom-vote/src/factom-identity")

const yellowListFact = []
yellowListFact.push("36422e9560f56e0ead53a83b33aec9571d379291b5e292b88dec641a98ef05d8")
yellowListFact.push("d595251fcf8c5893476e35284f90b809fb6c2ff6f3e19dcf04f7a76af7644720")
yellowListFact.push("2e6e1d3752d94784b21022b123174ea7220f38475b38efa316c24c213eb350cc")
yellowListFact.push("7accb986f836f72c6d90983a4a2a32dcc7fdafb62e6416f486835d931964abca")
yellowListFact.push("e639f647538f6464bb5e491319d68356ba6ef938e370d9050bba6e4c776d5faf")
yellowListFact.push("cc384004c41adb115783daaa06f23b4b74a7272057259bb2d47c9b01604a81d9")
yellowListFact.push("268c507145d8484c1777d5162ef84f7f096a3f706db8142a02c337b70c2255ec")
yellowListFact.push("4f366dc19b54aff5c3849b10c5cbcbe9cc44e8f226528bc98f499faeff00e05d")
yellowListFact.push("5ed3c5ef86892fd4f74d1782786c3d167d786abdb2d7899d7594e35709aaabed")
yellowListFact.push("4937521142371fb8ee310ccf68e2ddcf0b22e9358c5a75e91b28dc55a566bff4")

const yellowListFctAddr = []
yellowListFctAddr.push("Fs1jQGc9GJjyWNroLPq7x6LbYQHveyjWNPXSqAvCEKpETNoTU5dP")
yellowListFctAddr.push("Fs2wZzM2iBn4HEbhwEUZjLfcbTo5Rf6ChRNjNJWDiyWmy9zkPQNP")
yellowListFctAddr.push("Fs1fxJbUWQRbTXH4as6qazoZ3hunmzL9JfiEpA6diCGCBE4jauqs")
yellowListFctAddr.push("Fs2Fb4aB1N8VCBkQmeYMnLSNFtwGeRkqSmDbgw5BLa2Gdd8SVXjh")
yellowListFctAddr.push("Fs34u8hHboYaeisKpjt8AaGDr97zSviP5n5KmzD8FteSjjvSNA7D")
yellowListFctAddr.push("Fs2sSpxAPA1YqB69rvwVhRKUkLAbtoXNjyCjoK9kCofBEbVEt9dv")
yellowListFctAddr.push("Fs1cUy7WYSiCbVxhkk6Q3puCDe8Pv9YuDFTFG5p9C2krrHs5Mj1i")
yellowListFctAddr.push("Fs1vPgtgcoX9UYkN2jsQ1mhXuHNSAmUzDgore8CsmhCU5ipqST5q")
yellowListFctAddr.push("Fs23GYTqdmS3rDWcvvN73XiXF6tXBd3mRFMHg9qo6r7nVgSZtV3i")
yellowListFctAddr.push("Fs1skWrrAYXqLQALG2QeHVkU6kSLrmK5263DGTbLiiU9TCnYxb3s")

const yellowDogListFct = []
yellowDogListFct.push("Fs2nnTh6MvL3NNRN9NtkLhN5tyb9mpEnqYKjhwrtHtgZ9Ramio61")
yellowDogListFct.push("Fs2cB2ePgx2sw4aUqwPW2fEsJq1dZrhpeKgN5b4aTdV73UP3yk9u")
yellowDogListFct.push("Fs2URrecxKEQBHYnhJJkjMw1oasSNTErCc6bqwdxxRig2SW9FPb4")
yellowDogListFct.push("Fs2ukzgy4Ht3VBV8aASuWLCu4hJzWBpCBnGZE9FNxDtTqpbsVaUg")
yellowDogListFct.push("Fs38YkEUBTV953HQYdqE8qjrijqvBcxj2dZhygaVSsaL24RQpdK3")
yellowDogListFct.push("Fs1ipLUa2L7jwRzkUT2VUS5N94g1P7MmCdsi8tsexh9FaCEKXPX1")
yellowDogListFct.push("Fs1RSMA9nvxwi4XvcjJ3jJ8oLBqdGD1dmmSg5qWftmT6sryV8e8G")
yellowDogListFct.push("Fs1XRzWPBLnLZPNmF47gZrpoMsjYHKihTT781SqoxUGBge56yE8n")
yellowDogListFct.push("Fs1Y6UQgThy2Yp2PRuafWRMeDM22R4HqedUDQAjaz5pDEnk6LjgE")
yellowDogListFct.push("Fs1xVDduWKtXxvZF5VeMCcV1FxgJAVhEGZvdmSyGjoiZbUUWMP8f")

const yellowListFactAccounts = []
yellowListFactAccounts.push("2fecaceac9fbdab23efb3f44df7a8f0672c27b4cbb71f1e519e58c3a975b4972")
yellowListFactAccounts.push("998da0b9d34be38b2ee799757cf6eb18bc2fea0c406e907364606bedf8b19fdd")
yellowListFactAccounts.push("53d99ea06a29be4b81d2d5ff7f7c30b2e629e70f7989dcfe0c252ca5c7358e09")
yellowListFactAccounts.push("1fabc256b98670a07150bfbceee62ea00fb67f538bd42d5e7e299adc56426601")
yellowListFactAccounts.push("c3e9590e245fd658e3cffa427e5fafa929a1effed23d354f1ad97809db7dc191")
yellowListFactAccounts.push("af93b0323cdd4f28407bdec02eb701b3c052f35b7ea9c63da1ca6c5159dd961e")
yellowListFactAccounts.push("30fb87365413748076c5fc7b0f0cec4c29aaee19cb7ed6ea5e52c839b6682179")
yellowListFactAccounts.push("9d82809e9bb57c3d141eec40bb61e03bc6a124873d40ed03366e444baf1d60e7")
yellowListFactAccounts.push("425bf3f77b11bce1eec48422cb9281c59f0fa6d9b6be3733185035e9ece67fc7")
yellowListFactAccounts.push("fdb55d4548d96d19f90d21f6feb8ba99bcdd21ceed14bb7ccf1a5ab2d3e23cfd")

const yellowListEC = []
yellowListEC.push("59bf006983f72f226d073bac578cef91f3947fc2e213568b852baf0d107831a2")
yellowListEC.push("756f2182b5203b6b7983a3684560121e8d2f86e837a00f9036916d4e30b22590")
yellowListEC.push("6a35883989668d55de73957e24683d43269274445a4d21a9c7fc96ac8d2f7a20")
yellowListEC.push("f711450c5f58444bf3679401879bf28277fe2b30ddecf705f34c33041666357c")
yellowListEC.push("e73074c559c3f700e31e7b286ecc6550cafcce843067f52caa1b968ecf5140e5")
yellowListEC.push("5aa29b935fff540d6b1658055a5c33ac77b7006778f3fbe6a905a86ee6b7c72a")
yellowListEC.push("cdcb0f282e668e1a097cb3e1640810fe1fbef14f335bf2cb06fc0f546994a7cd")
yellowListEC.push("6fea6fb820587292ad4fd95bb4c42f169988540ea6a4ff995c2c353e253fcad5")
yellowListEC.push("395da089850349afa6a55014a328bfc5c806908097bd5edafef890eb2c81376d")
yellowListEC.push("85019eb17e118dc6ef655ea6494a7344a0104021b48caa9993743cb977840f84")

const yellowListIdentity = []
yellowListIdentity.push("b01fa66e4240bf943bff5c37c873fc4680f8d6d889bdb1b56806bc61efc9e4d0")
yellowListIdentity.push("4bf6d2eaf3734924081e9f0a40851ed5f82ea9884755c8e4155d18e88c7feaa6")
yellowListIdentity.push("9ab4a97ad431880043448fd04d7156ae2533b5d0c69aa0beddd615a4997862a2")
yellowListIdentity.push("bd1116f3413db66f1599784ffd388e55028e86aefa74d36ddd955eddc1f2b330")
yellowListIdentity.push("0a7f54d1bded2844e3a3a013c763bad7da8d448ddda0f1e9b5e762ffacd64e31")

const yellowAddressListIDpub = []
yellowAddressListIDpub.push("idpub2Q7m3YwkQMmNQUVpfcED52b7nFmYFWkiMGGF41srZ9hZZYmC5p")
const yellowAddressListIDsec = []
yellowAddressListIDsec.push("idsec2VZ2EJ1hoUeQYmFPeFthWts3xsGiPpRdfL4zABjzuHQshX4qvY")

describe("FactomBIP44", function() {
  it("Using a Factoid chain", function() {
    const mn = "yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow"
    const wallet = new bip44.FactomBIP44(mn)
    const chain = wallet.getFactoidChain(0, 0)
    for (let i = 0; i < 5; i++) {
      assert.equal(chain.next().toString("hex"), yellowListFact[i])
    }
  })
  it("Using a Entry Credit chain", function() {
    const mn = "yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow"
    const wallet = new bip44.FactomBIP44(mn)
    const chain = wallet.getEntryCreditChain(0, 0)
    for (let i = 0; i < 5; i++) {
      assert.equal(chain.next().toString("hex"), yellowListEC[i])
    }
  })
  it("Using a Identity chain", function() {
    const mn = "yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow"
    const wallet = new bip44.FactomBIP44(mn)
    const chain = wallet.getIdentityChain(0, 0)
    for (let i = 0; i < 5; i++) {
      assert.equal(chain.next().toString("hex"), yellowListIdentity[i])
    }
  })
  it("List from golang implmentation", function() {
    const mn = "yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow"
    for (let i = 0; i < 5; i++) {
      const wallet = new bip44.FactomBIP44(mn)
      assert.equal(wallet.generateFactoidPrivateKey(0, 0, i).toString("hex"), yellowListFact[i])
    }
  })

  it("List from golang implmentation changing the accounts", function() {
    const mn = "yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow"
    for (let i = 0; i < 5; i++) {
      const wallet = new bip44.FactomBIP44(mn)
      assert.equal(
        wallet.generateFactoidPrivateKey(0, i + 1, i).toString("hex"),
        yellowListFactAccounts[i]
      )
    }
  })

  it("List from golang implmentation for entry credits", function() {
    const mn = "yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow"
    for (let i = 0; i < 5; i++) {
      const wallet = new bip44.FactomBIP44(mn)
      assert.equal(wallet.generateEntryCreditPrivateKey(0, 0, i).toString("hex"), yellowListEC[i])
    }
  })

  it("List from http://stevenmasley.me/bip39.html implmentation for mnemonic seed", function() {
    const mn = "yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow"
    for (let i = 0; i < 5; i++) {
      const wallet = new bip44.FactomBIP44(mn)
      const addr = fctUtils.seedToPrivateFctAddress(wallet.generateFactoidPrivateKey(0, 0, i))
      assert.equal(addr, yellowListFctAddr[i])
    }
  })
  it("List from http://stevenmasley.me/bip39.html implmentation for salted mnemonic seed", function() {
    const mn = "yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow"
    const passphrase = "dog"
    for (let i = 0; i < 5; i++) {
      const wallet = new bip44.FactomBIP44(mn, passphrase)
      const addr = fctUtils.seedToPrivateFctAddress(wallet.generateFactoidPrivateKey(0, 0, i))
      assert.equal(addr, yellowDogListFct[i])
    }
  })

  it("List from golang implmentation changing the identity", function() {
    const mn = "yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow"
    for (let i = 0; i < 1; i++) {
      const wallet = new bip44.FactomBIP44(mn)
      const privKeyIdentity = wallet.generateIdentityPrivateKey(0, 0, i)
      const humanPrivKeyIdentity = fctUtilsId.keyToSecretIdentityKey(privKeyIdentity)
      const humanPubKeyIdentity = fctUtilsId.getPublicIdentityKey(humanPrivKeyIdentity)
      assert.equal(humanPrivKeyIdentity, yellowAddressListIDsec[i])
      assert.equal(humanPubKeyIdentity, yellowAddressListIDpub[i])
    }
  })

  it("Mnemonic matches", function() {
    for (let i = 0; i < 5; i++) {
      const mn = bip44.randomMnemonic()
      assert.equal(mn.trim().split(/\s+/g).length >= 12, true)
    }
  })

  it("Mnemonic is valid", function() {
    for (let i = 0; i < 5; i++) {
      const v = bip44.validMnemonic(bip44.randomMnemonic())
      assert.equal(v, true)
    }
  })

  it("Mnemonic verify works", function() {
    let s = "yellow"
    assert.equal(bip44.validMnemonic(s), false)

    s = "yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow"
    assert.equal(bip44.validMnemonic(s), true)

    s = s + "yellow"
    assert.equal(bip44.validMnemonic(s), false)

    s = "yellow potato yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow"
    assert.equal(bip44.validMnemonic(s), false)

    s = ""
    assert.equal(bip44.validMnemonic(s), false)
  })
})
