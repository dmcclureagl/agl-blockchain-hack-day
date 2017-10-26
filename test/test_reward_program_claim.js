const Kwh = artifacts.require("./Kwh.sol")
const DRProgram = artifacts.require("./DRProgram.sol")
const ethUtil = require('ethereumjs-util');
const ethABI = require('ethereumjs-abi');
let callResponse
let txResponse
let token

contract('DRProgram Token Rewards', accounts => {
  const owner = accounts[0]
  const user1 = accounts[1]
  let nonce = 0

  it("create a new energy contract.", async () => {
    kwh = await Kwh.new({ from: owner })
    drProgram = await DRProgram.new(kwh.address, { from: owner })
    await kwh.addDRProgram(drProgram.address, { from: owner })

    // Confirm deployed contracts functioning correctly
    // drProgram = await DRProgram.deployed()
    // kwh = await Kwh.deployed()

    // Add a new contract
    let duration = 10000000
    let maxPayout = 1000
    const contractParts = [
      { value: duration, type: 'uint256' },
      { value: maxPayout, type: 'uint256' },
      { value: nonce, type: 'uint256' },
    ]

    const types = contractParts.map(o => o.type);
    const values = contractParts.map(o => o.value);
    const hashBuff = ethABI.soliditySHA3(types, values);
    const programId = ethUtil.bufferToHex(hashBuff);
    await drProgram.addContract(duration, maxPayout, nonce++)
    const program = await drProgram.activeContracts_(programId)

    // Make a claim
    let energyReduction = 10
    await drProgram.claimRewards(programId, energyReduction, { from: user1 })

    const userBalance = await kwh.balanceOf(user1)
    assert.equal(userBalance.toNumber(), 10, 'User balance not updated')
  })
})
