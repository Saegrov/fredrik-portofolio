import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/takeUntil';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StateService } from '../state.service';

@Component({
  selector: 'about',
  styleUrls: ['./click.component.css'],
  templateUrl: './click.component.html'
})
export class ClickComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('enseBox') public enseBoxEl: ElementRef;

  public images: any[];
  public currentImage: any = {};
  public currentEnseWord = 'aftenselskap';
  private currentImageIndex = 0;
  private currentEnseIndex = 0;
  private subscription;

  private enseWords = [
    'aftenselskap',
    'begrenset',
    'utslippsgrensene',
    'tiltaksgrense',
    'konsekvensetikk',
    'brensel',
    'pologenser',
    'sammensetninger',
    'avgrense',
    'ubegrense',
    'collegegenser',
    'bydelsgrenser',
    'eksponergingsgrensen',
    'flybrensel',
    'forfallstendenser',
    'forurenser',
    'gjengtendenser',
    'grenseland',
    'kjensel',
    'luftrense',
    'oljeforurenset',
    'ordsammensetninger',
    'pollensesongen',
    'potenseksponent',
    'promillegrensen',
    'pustefrekvensen',
    'nrk-lisensen',
    'tepperenseriet',
    'renselse',
    'rensende',
    'skrensespor',
    'smertegrense',
    'verdenserkjennelsene',
    'brukergrensesnittet',
    'ense',
    'aldersgrensespørsmål',
    'sysselsettingskonsekvenser',
    'impotensen',
    'jazzensemblet',
    'morgensexen',
    'rensekapasitet',
    'kompenseres',
    'demensen',
    'kondenseres',
    'verdenseliten',
    'aldersgrense',
    'konsentrasjonstendensen',
    'sameksistensen',
    'renses',
    'differensen',
    'oppløsingstendensene',
    'Tøyensenteret',
    'hjertefrekvensen',
    'oppløsningstendenser',
    'mensen',
    'fattigdomsgrensen'
  ];

  constructor(private stateService: StateService) {
  }

  public ngOnInit() {
    this.subscription = this.stateService.getImages$()
      .subscribe((value: any[]) => {
        this.images = value;
        this.currentImage = this.images[this.currentImageIndex];

      });
  }

  public ngAfterViewInit() {
    let nel: HTMLElement = this.enseBoxEl.nativeElement;

    let mouseOver = Observable.fromEvent(nel, 'mouseenter');
    let mouseleave = Observable.fromEvent(nel, 'mouseleave');

    mouseOver
      .switchMap(() => {
        return Observable.timer(0, 350)
          .takeUntil(mouseleave);
      })
      .subscribe(() => {
        this.currentEnseIndex += 1;
        if (this.currentEnseIndex === this.enseWords.length) {
          this.currentEnseIndex = 0;
        }
        this.currentEnseWord = this.enseWords[this.currentEnseIndex];
      });

  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public testClick() {
    this.currentImageIndex += 1;
    if (this.currentImageIndex === this.images.length) {
      this.currentImageIndex = 0;
    }

    this.currentImage = this.images[this.currentImageIndex];
  }

}
