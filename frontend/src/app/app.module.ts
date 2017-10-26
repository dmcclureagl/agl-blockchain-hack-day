import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Baked in reqs for material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { MomentModule } from 'angular2-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Services
import { BlockchainService } from './blockchain.service';
import { CurrentBalanceComponent } from './current-balance/current-balance.component';
import { RecentTransactionsComponent, AglNotificationDialog } from './recent-transactions/recent-transactions.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentBalanceComponent,
    RecentTransactionsComponent,
    NotificationsComponent,
    AglNotificationDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MomentModule
  ],
  providers: [
    BlockchainService
  ],
  entryComponents: [
    AglNotificationDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
