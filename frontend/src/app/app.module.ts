import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Baked in reqs for material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Services
import { BlockchainService } from './blockchain.service';
import { CurrentBalanceComponent } from './current-balance/current-balance.component';
import { RecentTransactionsComponent } from './recent-transactions/recent-transactions.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentBalanceComponent,
    RecentTransactionsComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    BlockchainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
