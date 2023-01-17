import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  template: `<ng-content></ng-content>
    <div #anchor></div>`,
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  @Input() options = {};
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor', { static: true }) anchor!: ElementRef<HTMLElement>;

  private observer!: IntersectionObserver;

  constructor(private host: ElementRef) {}

  ngOnInit() {
    const options = {
      root: null,
      ...this.options,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.element.scrollTop > 0 && this.scrolled.emit();
    }, options);
    this.observer.observe(this.anchor.nativeElement);
  }

  get element() {
    return this.host.nativeElement;
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
