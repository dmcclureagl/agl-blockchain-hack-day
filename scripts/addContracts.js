const contract = require('truffle-contract')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const ethUtil = require('ethereumjs-util');
const ethABI = require('ethereumjs-abi');
const DRProgramArtifacts = require('../build/contracts/DRProgram.json')
const drProgram = contract(DRProgramArtifacts);
drProgram.setProvider(web3.currentProvider);

const owner = web3.eth.accounts[0]

addContracts()

async function addContracts() {
    let nonce = 0;
    let duration = 10000000;
    let maxPayout = 1000;

    const token = await drProgram.deployed();
    const contractParts = [
      { value: duration, type: 'uint256' },
      { value: maxPayout, type: 'uint256' },
      { value: nonce, type: 'uint256' },
    ];
    const types = contractParts.map(o => o.type);
    const values = contractParts.map(o => o.value);
    const hashBuff = ethABI.soliditySHA3(types, values);
    const programId = ethUtil.bufferToHex(hashBuff);

    let tx;
    let energyReduction = 10;

    addContractTx = await token.addContract(duration, maxPayout, nonce, {from: owner, gas: 4e6});
    claimRewardsTx = await token.claimRewards(programId, energyReduction, { from: owner });

    console.log(addContractTx.logs[0]);
    console.log(claimRewardsTx.logs[0]);
}
