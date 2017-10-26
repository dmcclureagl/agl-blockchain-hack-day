import { BlockchainService } from '../blockchain.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'agl-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss']
})
export class RecentTransactionsComponent implements OnInit {
  public transactions = [];
  constructor(private blockchainService: BlockchainService) { }

  ngOnInit() {
    this.blockchainService.updateRecentTransactions.subscribe((res) => {
      this.transactions.push({ event: 'Contract Added', time: new Date() });
    });

    this.blockchainService.updateTokensUpdated.subscribe(() => {
      this.transactions.push({ event: `You've earned ${this.blockchainService.tokensMined} ${this.blockchainService.symbol}!` });
    });
  }

}
