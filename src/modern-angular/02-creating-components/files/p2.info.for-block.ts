import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ul>
      @for (name of names; track name) {
        <li>{{ name }}</li> 
      }
    </ul>
  `
})
export class AppComponent {
  names: string[] = ['blue', 'charlie', 'delta', 'echo'];
}
