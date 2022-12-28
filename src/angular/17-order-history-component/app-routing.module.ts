import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './order/history/history.component';
import { OrderComponent } from './order/order.component';
import { DetailComponent } from './restaurant/detail/detail.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'restaurants',
    component: RestaurantComponent,
  },
  {
    path: 'restaurants/:slug',
    component: DetailComponent,
  },
  {
    path: 'restaurants/:slug/order',
    component: OrderComponent,
  },
  {
    path: 'order-history',
    component: HistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
