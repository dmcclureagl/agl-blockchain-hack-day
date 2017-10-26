const Kwh = artifacts.require("./Kwh.sol");
const DRProgram = artifacts.require("./DRProgram.sol");
const owner = web3.eth.accounts[0]

module.exports = deployer => {
  deployer.deploy(Kwh, { from: owner, gas: 4e6 }).then(() => {
    return deployer.deploy(DRProgram, Kwh.address, { from: owner, gas: 4e6 })
  })
}
