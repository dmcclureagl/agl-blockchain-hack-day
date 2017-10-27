import { BlockchainService } from '../blockchain.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'agl-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss']
})
export class RecentTransactionsComponent implements OnInit {
  public transactions = [];
  public transactionInformation = [];

  constructor(
    private blockchainService: BlockchainService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.blockchainService.updateRecentTransactions.subscribe((res) => {
        this.pushTransactions({ event: 'Contract Added', time: moment().format("h:mm:ss a") });
        this.openNotification();
    });

    this.blockchainService.updateTokensUpdated.subscribe(() => {
        this.pushTransactions({ event: `You've earned ${this.blockchainService.tokensMined} ${this.blockchainService.symbol}!` });
        this.snackBar.open(`You've earned ${this.blockchainService.tokensMined} ${this.blockchainService.symbol}!`, 'Dismiss', {extraClasses: ['highLightMeMore']});
    });
  }

  public openNotification() {
    this.dialog.open(AglNotificationDialog, {
        data: { information: this.transactionInformation }
    });
  }

  private pushTransactions(event) {
    if (this.transactions.length >= 12) {
      // Keep trimmed to 4 items
      this.transactions = this.transactions.slice(Math.max(this.transactions.length - 12, 1));
    } else {
      // Add till we have 4 items in the array
      this.transactions.push(event);
    }
  }

}

@Component({
  selector: 'agl-notification-dialog',
  template: `
    <div md-dialog-content>
      <h1>TODO: Event Title</h1>
      <p>Earn KWH right now by reducing your energy.<p>
      <span>Reducing energy tips</span>
      <ul>
        <li>Turn off or turn down your split system</li>
        <li>TODO: More things...</li>
      </ul>
    </div>
    <div md-dialog-actions>
      <button mat-raised-button (click)="onNoClick()" color="primary">Close</button>
    </div>
  `,
})
export class AglNotificationDialog {

  constructor(
      public dialogRef: MatDialogRef<AglNotificationDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
      this.dialogRef.close();
  }

}
