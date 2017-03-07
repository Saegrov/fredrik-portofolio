import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/takeUntil';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ense',
  templateUrl: './ense.component.html',
  styles: ['a { text-decoration: none}']
})
export class EnseComponent implements AfterViewInit {
  @ViewChild('enseBox') public enseBoxEl: ElementRef;
  public currentEnseWord = 'Ense';
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

  public ngAfterViewInit() {
    let nel: HTMLElement = this.enseBoxEl.nativeElement;

    let mouseOver = Observable.fromEvent(nel, 'mouseenter');
    let mouseleave = Observable.fromEvent(nel, 'mouseleave');

    mouseOver
      .switchMap(() => {
        return Observable.timer(0, 500)
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
