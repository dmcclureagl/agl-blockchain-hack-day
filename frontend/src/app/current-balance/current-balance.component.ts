import { BlockchainService } from '../blockchain.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'agl-current-balance',
  templateUrl: './current-balance.component.html',
  styleUrls: ['./current-balance.component.scss']
})
export class CurrentBalanceComponent implements OnInit {

  public balance: number;

  constructor(private blockchainService: BlockchainService) {
    this.balance = this.blockchainService.currentBalance;
  }

  ngOnInit() {
    this.updateBalance(30);
  }

  public updateBalance(amount: number) {
    this.blockchainService.currentBalance = amount;
    this.balance = amount;
  }

}
