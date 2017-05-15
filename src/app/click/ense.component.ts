import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeUntil';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'ense',
  templateUrl: './ense.component.html',
  styles: ['a { text-decoration: none}  .hover a:hover {text-decoration: underline}']
})
export class EnseComponent implements AfterViewInit {
  @ViewChild('enseBox') public enseBoxEl: ElementRef;
  public currentEnseWord = 'Ense';
  public hoverClass = true;
  private currentEnseIndex = 0;
  private enseWords = [
    'Ense',
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

  constructor (private router: Router) {

  }

  public ngAfterViewInit () {

    this.router.events
      .filter((e: Event) => e instanceof NavigationEnd)
      .subscribe((value: Event) => {
        this.hoverClass = value.url === '/om';

      });
    let nel: HTMLElement = this.enseBoxEl.nativeElement;

    let mouseOver = Observable.fromEvent(nel, 'mouseenter');
    let mouseleave = Observable.fromEvent(nel, 'mouseleave');

    mouseOver
      .switchMap(() => {
        if (this.router.url === '/om') {
          return Observable.empty();
        }

        return Observable.timer(0, 750)
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
}
