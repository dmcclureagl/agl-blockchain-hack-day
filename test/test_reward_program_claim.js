const Kwh = artifacts.require("./Kwh.sol")
const DRProgram = artifacts.require("./DRProgram.sol")
let callResponse
let txResponse
let token

contract('DRProgram Token Rewards', accounts => {
  const owner = accounts[0]
  const user1 = accounts[1]

  it("create a new energy contract.", async () => {
    kwh = await Kwh.new({ from: owner })
    drProgram = await DRProgram.new(kwh.address, { from: owner })

    console.log(drProgram)

    // Add a new contract
    let duration = 1000
    let maxPayout = 1000

    drProgram.addContract()

    // let value = 1

    // callResponse = await token.mint.call(user1, value, { from: owner })
    // txResponse = await token.mint(user1, value, { from: owner })

    // // Assert after tx so we can see the emitted logs in the case of failure.
    // assert(callResponse, 'Call response was not true.')

    // // Event emission
    // const eventLog = txResponse.logs[0]
    // assert.equal(eventLog.event, 'LogTokensMinted', 'LogTokensMinted event was not emitted.')
    // assert.equal(eventLog.args.to, user1, 'Incorrect to was emitted.')
    // assert.equal(eventLog.args.value, value, 'Incorrect value was emitted.')
    // assert.equal(eventLog.args.totalSupply, value, 'Incorrect totalSupply was emitted.')

    // // Balance
    // const balance = await token.balanceOf.call(user1)
    // assert.equal(balance.toNumber(), value, 'Incorrect user token balance.')

    // // Total Supply
    // const supply = await token.totalSupply.call()
    // assert.equal(supply.toNumber(), value, 'Incorrect total supply balance.')
  })
})
