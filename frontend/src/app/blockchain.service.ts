import { Injectable } from '@angular/core';
import * as kwhJson from '../../../build/contracts/Kwh.json';
import * as DRProgramJson from '../../../build/contracts/DRProgram.json';

@Injectable()
export class BlockchainService {
  public kwhAddress = '0x380f0553019d8d7a1382829fd3a61a342f04134d';
  public DRProgramAddress = '0x1b4d268285812a908b235bb1d91ee0a4d610b241';

  constructor() {
    console.log(kwhJson);
    console.log(DRProgramJson);
  }

}
