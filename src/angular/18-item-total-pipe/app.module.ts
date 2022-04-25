import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ImageUrlPipe } from './image-url.pipe';
import { DetailComponent } from './restaurant/detail/detail.component';
import { OrderComponent } from './order/order.component';
import { MenuItemsComponent } from './order/menu-items/menu-items.component';
import { OnlyNumbersDirective } from './only-numbers.directive';
import { HistoryComponent } from './order/history/history.component';
import { ListComponent } from './order/list/list.component';
import { ItemTotalPipe } from './item-total.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantComponent,
    ImageUrlPipe,
    DetailComponent,
    OrderComponent,
    MenuItemsComponent,
    OnlyNumbersDirective,
    HistoryComponent,
    ListComponent,
    ItemTotalPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TabsModule.forRoot()
  ],
  providers: [ItemTotalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
