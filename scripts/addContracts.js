const contract = require('truffle-contract')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const ethUtil = require('ethereumjs-util');
const ethABI = require('ethereumjs-abi');
const DRProgramArtifacts = require('../build/contracts/DRProgram.json')
const drProgram = contract(DRProgramArtifacts);
drProgram.setProvider(web3.currentProvider);

const owner = web3.eth.accounts[0]
let token;

addContracts()

async function addContracts() {
    let nonce = 0;
    let duration;
    let maxPayout;
    let energyReduction;

    token = await drProgram.deployed();

    energyReduction = Math.floor((Math.random() * 20) + 1)
    duration = Math.floor((Math.random() * 10000000000000) + 10000000)
    maxPayout = Math.floor((Math.random() * 1000) + 10)
    console.log('\n\nEnergy Reduction: ' + energyReduction)
    console.log('Duration: ' + duration)
    console.log('Max Payout: ' + maxPayout)
    await addContractAndClaimReward(nonce++, duration, maxPayout, energyReduction)

    setInterval(async () => {
      energyReduction = Math.floor((Math.random() * 20) + 1)
      duration = Math.floor((Math.random() * 10000000000000) + 10000000)
      maxPayout = Math.floor((Math.random() * 1000) + 10)
      console.log('\n\nEnergy Reduction: ' + energyReduction)
      console.log('Duration: ' + duration)
      console.log('Max Payout: ' + maxPayout)
      await addContractAndClaimReward(nonce++, duration, maxPayout, energyReduction)
    }, Math.floor((Math.random() * 60000) + 10000));
}

async function addContractAndClaimReward(nonce, duration, maxPayout, energyReduction) {
  const contractParts = [
    { value: duration, type: 'uint256' },
    { value: maxPayout, type: 'uint256' },
    { value: nonce, type: 'uint256' },
  ];
  const types = contractParts.map(o => o.type);
  const values = contractParts.map(o => o.value);
  const hashBuff = ethABI.soliditySHA3(types, values);
  const programId = ethUtil.bufferToHex(hashBuff);

  // New Event, add contract
  addContractTx = await token.addContract(duration, maxPayout, nonce, {from: owner, gas: 4e6});
  console.log(`New Contract Added! ID: ${programId}`);
  console.log(addContractTx.logs[0])

  // 30s
  await sleep(10000)

  claimRewardsTx = await token.claimRewards(programId, energyReduction, { from: owner });
  console.log('Rewards claimed!');
  console.log(claimRewardsTx.logs[0])
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
