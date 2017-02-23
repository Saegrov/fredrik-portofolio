import { Routes } from '@angular/router';
import { AboutComponent } from './about';
import { ClickComponent } from './click/click.component';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '', component: ClickComponent },
  { path: 'om', component: AboutComponent },
  { path: 'click', component: ClickComponent },
  { path: '**', component: NoContentComponent },
];
