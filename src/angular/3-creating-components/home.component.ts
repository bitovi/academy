import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pmo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  title = 'Ordering food has never been easier';

  constructor() { }

  ngOnInit() {
  }

}