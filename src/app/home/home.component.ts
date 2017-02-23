import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StateService } from '../state.service';
import { Title } from './title';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') public element: ElementRef;
  public images: any[] = [];

  constructor(public stateService: StateService) {
  }

  public ngOnInit() {
    this.images = this.stateService.getImages();
  }

  public ngAfterViewInit(): void {
    console.error(this.element);

    let nel: HTMLCanvasElement = this.element.nativeElement;
    let context: CanvasRenderingContext2D = nel.getContext('2d');

    Observable
      .fromEvent(nel, 'mouseover')
      .subscribe(() => {
        console.error('GOT OVER');

        let image = new Image();
        image.onload = () => {
          console.error('load?');
          context.drawImage(image, 0, 0);
        };

        image.src = this.images[0].url;
        console.error(image);

      });
  }
}
