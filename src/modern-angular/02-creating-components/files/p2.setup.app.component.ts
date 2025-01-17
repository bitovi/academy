import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestaurantComponent } from './restaurant/restaurant.component';

@Component({
  selector: 'pmo-root',
  imports: [RouterOutlet, RestaurantComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'place-my-order';
}
