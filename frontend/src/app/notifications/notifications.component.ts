import { BlockchainService } from '../blockchain.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'agl-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(private blockchainService: BlockchainService) { }

  ngOnInit() {

  }

}
