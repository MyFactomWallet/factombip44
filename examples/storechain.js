#!/usr/bin/env node

let chainid_index = 0

process.argv.forEach(function(val, index) {
  if (val === "--chainid") chainid_index = index + 1
})

let chainid = "0000000000000000000000000000000000000000000000000000000000000000"
if (chainid_index != 0) {
  chainid = process.argv[chainid_index]
}

if (!chainid_index) {
  console.log("Usage: example/storechain.js --chainid chain_id_in_hex")
  process.exit(1)
}

const { TransportU2F } = require("@ledgerhq/hw-transport-u2f")
const { Fct } = require("@factoid.org/hw-app-fct")

async function storeit() {
  let transport = await TransportU2F.create()
  const fct = new Fct(transport)

  console.log("attempting to store chain id.  check ledger display")
  const store_result = await fct.storeChainId(chainid)
  console.log(store_result)

  console.log("confirming result from from ledger")
  const path = "44'/281'/0'/0/0"
  const addr = await fct.getAddress(path, false)
  if (addr) {
    console.log(addr)
  } else {
    console.log("error reading addr from ledger")
  }
}

storeit()
