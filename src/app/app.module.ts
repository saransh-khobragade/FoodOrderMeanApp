import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { KichenComponent } from './kichen/kichen.component';

import { Routing } from './app.route';
import { DataService } from './data.service';


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    KichenComponent,
  ],
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
