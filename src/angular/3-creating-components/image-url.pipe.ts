import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: any): any {
    return value.replace('node_modules/place-my-order-assets', './assets');
  }
}
