import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import Web3 from 'web3';

import * as kwhJson from '../../../build/contracts/Kwh.json';
import * as DRProgramJson from '../../../build/contracts/DRProgram.json';

@Injectable()
export class BlockchainService {
  public kwhAddress = '0xdfefb183451308284d8842768b60bf491c1a46b3';
  public DRProgramAddress = '0xd3849f4b57a0d5ce0fc6a4edac0633042cb1d367';

  public currentBalance = 0;
  public symbol: string;
  public tokensMined;
  public defaultAccount;
  public web3;
  public DRPcontract;
  public kwhContract;

  public updateCurrentBalance = new Subject<number>();
  public currentBalanceUpdated = this.updateCurrentBalance.asObservable();

  public updateTokensAquired = new Subject<number>(); 
  public updateTokensUpdated = this.updateTokensAquired.asObservable();

  public updateRecentTransactions = new Subject<number>();
  public transactionsUpdated = this.updateRecentTransactions.asObservable();

  constructor() {
    this.initEtherConnection();
  }

  public initEtherConnection() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
    )
    this.defaultAccount = this.web3.eth.accounts[0];
    this.web3Connection();
  }

  public web3Connection() {
    const drpAbi = (<any>DRProgramJson).abi;
    const kwhAbi = (<any>kwhJson).abi;
    const owner = this.web3.eth.accounts[0];

    this.DRPcontract = this.web3.eth.contract(drpAbi).at(this.DRProgramAddress);
    this.kwhContract = this.web3.eth.contract(kwhAbi).at(this.kwhAddress);

    // The balance
    this.currentBalance = this.kwhContract.balanceOf(owner).toNumber();

    // The Symbol
    this.symbol = this.kwhContract.symbol();

    // The event when we add it
    this.DRPcontract.LogContractAdded({from: 'latestBlock', to: 'latestBlock'}).watch((err, res) => {
      if (res) {
        this.updateRecentTransactions.next(res);
      }
    
      if (err) {
        throw new Error();
      }
    });

    // When they earn kWh
    this.kwhContract.LogTokensMinted({from: 'latestBlock', to: 'latestBlock'}).watch((err, res) => {
      if (res.args.to === owner) {
        this.currentBalance = this.kwhContract.balanceOf(owner).toNumber();
        this.tokensMined = res.args.value.toNumber();
        this.updateCurrentBalance.next(this.currentBalance);
        this.updateTokensAquired.next(this.tokensMined);
      }

      if (err) {
        throw new Error();
      }
    });
  }
}
