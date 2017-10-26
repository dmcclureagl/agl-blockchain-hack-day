import { Component } from '@angular/core';
import { BlockchainService } from './blockchain.service';

@Component({
  selector: 'agl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private blockchainService: BlockchainService) {
    // console.log(this.blockchainService.DRProgramJson);
  }
}
