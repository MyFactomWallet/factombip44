var assert = require('assert')
var bip44 = require('../index.js')
const Buffer = require('safe-buffer').Buffer
const fctUtils = require('factomjs-util')

var yellowListFact = []
yellowListFact.push('0x36422e9560f56e0ead53a83b33aec9571d379291b5e292b88dec641a98ef05d8')
yellowListFact.push('0xd595251fcf8c5893476e35284f90b809fb6c2ff6f3e19dcf04f7a76af7644720')
yellowListFact.push('0x2e6e1d3752d94784b21022b123174ea7220f38475b38efa316c24c213eb350cc')
yellowListFact.push('0x7accb986f836f72c6d90983a4a2a32dcc7fdafb62e6416f486835d931964abca')
yellowListFact.push('0xe639f647538f6464bb5e491319d68356ba6ef938e370d9050bba6e4c776d5faf')
yellowListFact.push('0xcc384004c41adb115783daaa06f23b4b74a7272057259bb2d47c9b01604a81d9')
yellowListFact.push('0x268c507145d8484c1777d5162ef84f7f096a3f706db8142a02c337b70c2255ec')
yellowListFact.push('0x4f366dc19b54aff5c3849b10c5cbcbe9cc44e8f226528bc98f499faeff00e05d')
yellowListFact.push('0x5ed3c5ef86892fd4f74d1782786c3d167d786abdb2d7899d7594e35709aaabed')
yellowListFact.push('0x4937521142371fb8ee310ccf68e2ddcf0b22e9358c5a75e91b28dc55a566bff4')

var yellowListFactAccounts = []
yellowListFactAccounts.push('0x2fecaceac9fbdab23efb3f44df7a8f0672c27b4cbb71f1e519e58c3a975b4972')
yellowListFactAccounts.push('0x998da0b9d34be38b2ee799757cf6eb18bc2fea0c406e907364606bedf8b19fdd')
yellowListFactAccounts.push('0x53d99ea06a29be4b81d2d5ff7f7c30b2e629e70f7989dcfe0c252ca5c7358e09')
yellowListFactAccounts.push('0x1fabc256b98670a07150bfbceee62ea00fb67f538bd42d5e7e299adc56426601')
yellowListFactAccounts.push('0xc3e9590e245fd658e3cffa427e5fafa929a1effed23d354f1ad97809db7dc191')
yellowListFactAccounts.push('0xaf93b0323cdd4f28407bdec02eb701b3c052f35b7ea9c63da1ca6c5159dd961e')
yellowListFactAccounts.push('0x30fb87365413748076c5fc7b0f0cec4c29aaee19cb7ed6ea5e52c839b6682179')
yellowListFactAccounts.push('0x9d82809e9bb57c3d141eec40bb61e03bc6a124873d40ed03366e444baf1d60e7')
yellowListFactAccounts.push('0x425bf3f77b11bce1eec48422cb9281c59f0fa6d9b6be3733185035e9ece67fc7')
yellowListFactAccounts.push('0xfdb55d4548d96d19f90d21f6feb8ba99bcdd21ceed14bb7ccf1a5ab2d3e23cfd')

var yellowListEC = []
yellowListEC.push('0x59bf006983f72f226d073bac578cef91f3947fc2e213568b852baf0d107831a2')
yellowListEC.push('0x756f2182b5203b6b7983a3684560121e8d2f86e837a00f9036916d4e30b22590')
yellowListEC.push('0x6a35883989668d55de73957e24683d43269274445a4d21a9c7fc96ac8d2f7a20')
yellowListEC.push('0xf711450c5f58444bf3679401879bf28277fe2b30ddecf705f34c33041666357c')
yellowListEC.push('0xe73074c559c3f700e31e7b286ecc6550cafcce843067f52caa1b968ecf5140e5')
yellowListEC.push('0x5aa29b935fff540d6b1658055a5c33ac77b7006778f3fbe6a905a86ee6b7c72a')
yellowListEC.push('0xcdcb0f282e668e1a097cb3e1640810fe1fbef14f335bf2cb06fc0f546994a7cd')
yellowListEC.push('0x6fea6fb820587292ad4fd95bb4c42f169988540ea6a4ff995c2c353e253fcad5')
yellowListEC.push('0x395da089850349afa6a55014a328bfc5c806908097bd5edafef890eb2c81376d')
yellowListEC.push('0x85019eb17e118dc6ef655ea6494a7344a0104021b48caa9993743cb977840f84')

describe('bip44 tests', function () {
  it('Using a chain', function () {
    var mn = 'yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow'
    var wallet = new bip44.FactomBIP44(mn)
    var chain = wallet.getFactoidChain(0, 0)
    for (var i = 0; i < 5; i++) {
      assert.equal(fctUtils.bufferToHex(chain.next()), yellowListFact[i])
    }
  })
  it('List from golang implmentation', function () {
    for (var i = 0; i < 5; i++) {
      var mn = 'yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow'
      var wallet = new bip44.FactomBIP44(mn)
      assert.equal(fctUtils.bufferToHex(wallet.generateFactoidPrivateKey(0, 0, i)), yellowListFact[i])
    }
  })

  it('List from golang implmentation changing the accounts', function () {
    for (var i = 0; i < 5; i++) {
      var mn = 'yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow'
      var wallet = new bip44.FactomBIP44(mn)
      assert.equal(fctUtils.bufferToHex(wallet.generateFactoidPrivateKey(0, i + 1, i)), yellowListFactAccounts[i])
    }
  })

  it('List from golang implmentation for entry credits', function () {
    for (var i = 0; i < 5; i++) {
      var mn = 'yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow'
      var wallet = new bip44.FactomBIP44(mn)
      assert.equal(fctUtils.bufferToHex(wallet.generateEntryCreditPrivateKey(0, 0, i)), yellowListEC[i])
    }
  })

  it('Mnemonic matches', function () {
    for (var i = 0; i < 5; i++) {
      var mn = bip44.randomMnemonic()
      assert.equal(mn.trim().split(/\s+/g).length >= 12, true)
    }
  })

  it('Mnemonic is valid', function () {
    for (var i = 0; i < 5; i++) {
      var v = bip44.validMnemonic(bip44.randomMnemonic())
      assert.equal(v, true)
    }
  })

  it('Mnemonic verify works', function () {
    var s = 'yellow'
    var v = bip44.validMnemonic(s)
    assert.equal(v, false)

    s = 'yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow'
    v = bip44.validMnemonic(s)
    assert.equal(v, true)

    s = s + 'yellow'
    v = bip44.validMnemonic(s)
    assert.equal(v, false)

    s = 'yellow potato yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow'
    v = bip44.validMnemonic(s)
    assert.equal(v, false)

    s = ''
    v = bip44.validMnemonic(s)
    assert.equal(v, false)
  })
})
