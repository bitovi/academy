import 'zone.js'; // Work around issue in StackBlitz `Error: NG0908: In this configuration Angular requires Zone.js`

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
