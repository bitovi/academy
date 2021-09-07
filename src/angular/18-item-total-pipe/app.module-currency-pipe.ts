import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ImageUrlPipe } from './image-url.pipe';
import { DetailComponent } from './restaurant/detail/detail.component';
import { OrderComponent } from './order/order.component';
import { OnlyNumbersDirective } from './only-numbers.directive';
import { ItemTotalPipe } from './item-total.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RestaurantComponent,
        ImageUrlPipe,
        DetailComponent,
        OrderComponent,
        OnlyNumbersDirective,
        ItemTotalPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        TabsModule.forRoot()
    ],
    providers: [ItemTotalPipe, {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}],
    bootstrap: [AppComponent]
})
export class AppModule { }
