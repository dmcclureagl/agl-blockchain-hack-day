import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import Web3 from 'web3';

import * as kwhJson from '../../../build/contracts/Kwh.json';
import * as DRProgramJson from '../../../build/contracts/DRProgram.json';

@Injectable()
export class BlockchainService {
  public kwhAddress = '0xf0d8e0f9672dc86eb1d350b0b1b969f20cbc6c5a';
  public DRProgramAddress = '0x6b180277375346da70bc9d16249e5d117e4ee38a';

  public currentBalance = 0;
  public web3;
  public DRPcontract;
  public kwhContract;

  constructor() {
    this.initEtherConnection();
  }

  public initEtherConnection() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
    )

    let defaultAccount = this.web3.eth.accounts[0];

    // Quick check that web3 connection successful
    console.log(`web3 Connected? ${this.web3.isConnected()}`)
    console.log(`Default Account: ${defaultAccount}`)

    this.web3Connection();
  }

  public web3Connection() {
    const drpAbi = (<any>DRProgramJson).abi;
    const kwhAbi = (<any>kwhJson).abi;
    const owner = this.web3.eth.accounts[0];

    this.DRPcontract = this.web3.eth.contract(drpAbi).at(this.DRProgramAddress);
    this.kwhContract = this.web3.eth.contract(kwhAbi).at(this.kwhAddress);

    // The balance
    console.log('Balance', this.kwhContract.balanceOf(owner));

    // The event when we add it
    this.DRPcontract.LogContractAdded({from: 'latestBlock', to: 'latestBlock'}).watch((err, res) => {
      if (res) {
        // do UI
      }
    
      if (err) {
        throw new Error();
      }
    });

    // When they earn kWh
    this.kwhContract.LogTokensMinted({from: 'latestBlock', to: 'latestBlock'}).watch((err, res) => {
      if (res.args.to === owner) {
        console.log('LogTokensMinted', res);
      }

      if (err) {
        throw new Error();
      }
    });
  }
}
