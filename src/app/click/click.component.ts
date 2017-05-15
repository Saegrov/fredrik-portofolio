import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'about',
  styleUrls: ['./click.component.css'],
  templateUrl: './click.component.html'
})
export class ClickComponent implements OnInit, OnDestroy {
  public images: any[];
  public currentImage: any = {};

  private currentImageIndex = 0;
  private subscription;

  constructor (private stateService: StateService) {
  }

  public ngOnInit () {
    this.subscription = this.stateService.getImages$()
      .subscribe((value: any[]) => {
        this.images = value;
        this.currentImage = this.images[this.currentImageIndex];

      });
  }

  public ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  public goLeft () {
    this.currentImageIndex -= 1;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.images.length - 1;
    }
    this.currentImage = this.images[this.currentImageIndex];
    console.error(this.currentImageIndex);
    console.error(this.currentImage);
  }

  public goRight () {
    this.currentImageIndex += 1;
    if (this.currentImageIndex === this.images.length) {
      this.currentImageIndex = 0;
    }

    this.currentImage = this.images[this.currentImageIndex];
  }

}
