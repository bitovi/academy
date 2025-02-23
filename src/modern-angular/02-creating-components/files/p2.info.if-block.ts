import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      @if (showMyContent) {
        I will render if showMyContent is true.
      } @else {
        I render if showMyContent is not true.
      }
    </div>
  `
})
export class AppComponent {
  showMyContent = false;
}
