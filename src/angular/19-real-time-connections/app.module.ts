import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ImageUrlPipe } from './image-url.pipe';
import { DetailComponent } from './restaurant/detail/detail.component';
import { OrderComponent } from './order/order.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MenuItemsComponent } from './order/menu-items/menu-items.component';
import { HistoryComponent } from './order/history/history.component';
import { ListComponent } from './order/list/list.component';
import { OnlyNumbersDirective } from './only-numbers.directive';
import { ItemTotalPipe } from './item-total.pipe';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantComponent,
    ImageUrlPipe,
    DetailComponent,
    OrderComponent,
    MenuItemsComponent,
    HistoryComponent,
    ListComponent,
    OnlyNumbersDirective,
    ItemTotalPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  providers: [ItemTotalPipe, {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}],
  bootstrap: [AppComponent]
})
export class AppModule { }