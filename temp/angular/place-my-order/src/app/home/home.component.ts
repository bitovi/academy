import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pmo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public title: string = 'Ordering food has never been easier';

  constructor() { }

  ngOnInit() {
  }

}