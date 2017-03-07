import '../styles/styles.scss';
import '../styles/headings.css';
import { NgModule } from '@angular/core';
import { JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AboutComponent } from './about';
// App is our top level component
import { AppComponent } from './app.component';

import { ROUTES } from './app.routes';
import { ClickComponent } from './click/click.component';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { NoContentComponent } from './no-content';
import { StateService } from './state.service';
import { EnseComponent } from './click/ense.component';

// Application wide providers
const APP_PROVIDERS = [
  StateService
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    EnseComponent,
    AboutComponent,
    ClickComponent,
    NoContentComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    JsonpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
}
