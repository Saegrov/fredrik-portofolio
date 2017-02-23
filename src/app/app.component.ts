
/*
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StateService } from './state.service';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  public images = [];

  constructor(private stateService: StateService) {
  }

  public ngOnInit() {
    this.stateService.init();
  }
}
