import { Directive, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

let nextId = 1;

@Directive({
  selector: '[spyDirective]',
})
export class SpyDirective implements OnInit, OnDestroy {
  private id = nextId++;

  constructor() {}

  ngOnInit() {
    console.log(`___Spy #${this.id} onInit`);
  }

  ngOnDestroy() {
    console.log(`___Spy #${this.id} onDestroy`);
  }
}

// ngOnChanges(changes: SimpleChanges) {
//   for (const propName in changes) {
//     const chng = changes[propName];
//     const cur = JSON.stringify(chng.currentValue);
//     const prev = JSON.stringify(chng.previousValue);
//     console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
//   }
// }
//--------------------
// ngAfterViewInit(): void {
//   console.log('AfterViewInit', this.viewChild);
// }
//
// ngAfterViewChecked(): void {
//   console.log('AfterViewChecked', this.viewChild);
// }
// ----------------------
// ngAfterContentInit() {
//   // contentChild is set after the content has been initialized
//   this.logIt('AfterContentInit');
//   this.doSomething();
// }
//
// ngAfterContentChecked() {
//   // contentChild is updated after the content has been checked
//   if (this.prevHero === this.contentChild.hero) {
//     this.logIt('AfterContentChecked (no change)');
//   } else {
//     this.prevHero = this.contentChild.hero;
//     this.logIt('AfterContentChecked');
//     this.doSomething();
//   }
// }
