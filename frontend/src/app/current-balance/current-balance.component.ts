import { BlockchainService } from '../blockchain.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'agl-current-balance',
  templateUrl: './current-balance.component.html',
  styleUrls: ['./current-balance.component.scss']
})
export class CurrentBalanceComponent implements OnInit {

  public balance: number;
  public symbol: string;
  public defaultAccount: string;

  constructor(private blockchainService: BlockchainService) {
    this.balance = this.blockchainService.currentBalance;
    this.symbol = this.blockchainService.symbol;
    this.defaultAccount = this.blockchainService.defaultAccount;
  }

  ngOnInit() {
    this.blockchainService.currentBalanceUpdated.subscribe(() => {
      this.balance = this.blockchainService.currentBalance;
    });
  }

  public updateBalance(amount: number) {
    this.blockchainService.currentBalance = amount;
    this.balance = amount;
  }

}
