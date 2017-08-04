var assert = require('assert')
var bip44 = require('../index.js')
const Buffer = require('safe-buffer').Buffer
const fctUtils = require('factomjs-util')

var yellowList = []
yellowList.push('0x36422e9560f56e0ead53a83b33aec9571d379291b5e292b88dec641a98ef05d8')
yellowList.push('0xd595251fcf8c5893476e35284f90b809fb6c2ff6f3e19dcf04f7a76af7644720')
yellowList.push('0x2e6e1d3752d94784b21022b123174ea7220f38475b38efa316c24c213eb350cc')
yellowList.push('0x7accb986f836f72c6d90983a4a2a32dcc7fdafb62e6416f486835d931964abca')
yellowList.push('0xe639f647538f6464bb5e491319d68356ba6ef938e370d9050bba6e4c776d5faf')
yellowList.push('0xcc384004c41adb115783daaa06f23b4b74a7272057259bb2d47c9b01604a81d9')
yellowList.push('0x268c507145d8484c1777d5162ef84f7f096a3f706db8142a02c337b70c2255ec')
yellowList.push('0x4f366dc19b54aff5c3849b10c5cbcbe9cc44e8f226528bc98f499faeff00e05d')
yellowList.push('0x5ed3c5ef86892fd4f74d1782786c3d167d786abdb2d7899d7594e35709aaabed')
yellowList.push('0x4937521142371fb8ee310ccf68e2ddcf0b22e9358c5a75e91b28dc55a566bff4')

var yellowListAccounts = []
yellowListAccounts.push('0x2fecaceac9fbdab23efb3f44df7a8f0672c27b4cbb71f1e519e58c3a975b4972')
yellowListAccounts.push('0x998da0b9d34be38b2ee799757cf6eb18bc2fea0c406e907364606bedf8b19fdd')
yellowListAccounts.push('0x53d99ea06a29be4b81d2d5ff7f7c30b2e629e70f7989dcfe0c252ca5c7358e09')
yellowListAccounts.push('0x1fabc256b98670a07150bfbceee62ea00fb67f538bd42d5e7e299adc56426601')
yellowListAccounts.push('0xc3e9590e245fd658e3cffa427e5fafa929a1effed23d354f1ad97809db7dc191')
yellowListAccounts.push('0xaf93b0323cdd4f28407bdec02eb701b3c052f35b7ea9c63da1ca6c5159dd961e')
yellowListAccounts.push('0x30fb87365413748076c5fc7b0f0cec4c29aaee19cb7ed6ea5e52c839b6682179')
yellowListAccounts.push('0x9d82809e9bb57c3d141eec40bb61e03bc6a124873d40ed03366e444baf1d60e7')
yellowListAccounts.push('0x425bf3f77b11bce1eec48422cb9281c59f0fa6d9b6be3733185035e9ece67fc7')
yellowListAccounts.push('0xfdb55d4548d96d19f90d21f6feb8ba99bcdd21ceed14bb7ccf1a5ab2d3e23cfd')

describe('bip44 tests', function () {
  it('List from golang implmentation', function () {
  	for (var i = 0; i < 10; i++) {
    	var mn = 'yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow'
    	var wallet = new bip44.FactomBIP44(mn)
    	assert.equal(fctUtils.bufferToHex(wallet.generateFactoidPrivateKey(0, 0, i)), yellowList[i])
  	}
  })

  it('List from golang implmentation changing the accounts', function () {
  	for (var i = 0; i < 10; i++) {
    	var mn = 'yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow'
    	var wallet = new bip44.FactomBIP44(mn)
    	assert.equal(fctUtils.bufferToHex(wallet.generateFactoidPrivateKey(0, i + 1, i)), yellowListAccounts[i])
  	}
  })
})
