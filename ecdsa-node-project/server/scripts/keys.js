// generate public and private keys
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils")
const privateKey = secp.utils.randomPrivateKey()

console.log("private key", toHex(privateKey))
const publicKey = secp.getPublicKey(privateKey);

console.log("public key", toHex(publicKey))



/**
 * KEY 1
 * private key: 345b9dd5624c05bff613c615da617fac66037a1e66743336b1ccd98a2e27b1a1
 * public key: 0464e7f6e78956bdeb2a7372af4e7d18c21dfc4a535859bb31b744298fedb74324f124f04ea24db5cbf63f71d718ea4362e327b3ad254783baeb3304c70b60accc
 * 
 * KEY 2
 * private key: 82efb8d265731656fab62fac748a552e24b03b32b5b0299c2766ae508ca65c1b
 * public key: 0414b2ce72470efc7640631d3ced1204d6f1265b1fba52487784d89b090666db316dd6cdcc9a224a0f3aa03dec9e6c7aed127a46167afdf54288bc31a5093df5b6
 * 
 * KEY 3
 * private key: 323a8e9a5ac0d13b0266888f798dac527e7c2c05dd9c56573f56182a16e326b5
 * public key: 040b4efa2496d53dbe726c9bc1506dcc0395788ac79a5f34ca3fd98320db790c0c6e92174c1f874402b2d6a9a5a93b71ae15c498448561fd330bf54c34e65ceb8f
 */