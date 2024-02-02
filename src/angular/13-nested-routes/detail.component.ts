import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'pmo-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.less'
})
export class DetailComponent implements OnInit, OnDestroy {
  restaurant?: Restaurant;
  isLoading: boolean = true;
  private onDestroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.restaurantService
        .getRestaurant(slug)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((data: Restaurant) => {
          this.restaurant = data;
          this.isLoading = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
