const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils")
const { utf8ToBytes, hexToBytes } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak")
app.use(cors());
app.use(express.json());

const balances = {
  "0464e7f6e78956bdeb2a7372af4e7d18c21dfc4a535859bb31b744298fedb74324f124f04ea24db5cbf63f71d718ea4362e327b3ad254783baeb3304c70b60accc": 100,
  "0414b2ce72470efc7640631d3ced1204d6f1265b1fba52487784d89b090666db316dd6cdcc9a224a0f3aa03dec9e6c7aed127a46167afdf54288bc31a5093df5b6": 50,
  "040b4efa2496d53dbe726c9bc1506dcc0395788ac79a5f34ca3fd98320db790c0c6e92174c1f874402b2d6a9a5a93b71ae15c498448561fd330bf54c34e65ceb8f": 75,
};


app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { signature, recoveryBit, recipient, amount } = req.body;
  
  const bytes = utf8ToBytes("Hello")
  const hash = keccak256(bytes)
  let sender = null;
  try {
    sender = await secp.recoverPublicKey(hash, hexToBytes(signature), recoveryBit)
  } catch(error) {
    console.log(error)
  }
  
  console.log("Sender: ", sender)
  //const sender = toHex(senderBytes)
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
