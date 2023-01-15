import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, takeWhile } from 'rxjs';
import { DateCountDownService } from './date-count-down.service';

@Component({
  selector: 'app-date-count-down',
  templateUrl: './date-count-down.component.html',
  styleUrls: ['./date-count-down.component.scss'],
})
export class DateCountDownComponent implements OnInit, OnDestroy {
  @Input() day!: string;
  private subscription!: Subscription;
  public dateNow = new Date();
  public dDay!: Date;

  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference!: number;
  public secondsToDday!: number;
  public minutesToDday!: number;
  public hoursToDday!: number;
  public daysToDday!: number;

  constructor(private dateCountDownService: DateCountDownService) {}

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: number) {
    this.secondsToDday = Math.floor((timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) % this.SecondsInAMinute
    );
    this.hoursToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute)) % this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay)
    );
  }

  ngOnInit() {
    this.dDay = new Date(this.day);
    this.timeDifference = 1;
    this.subscription = this.dateCountDownService
      .startTimeDifferenceCounter(this.dDay)
      .pipe(takeWhile(value => this.timeDifference > 0))
      .subscribe(x => {
        this.getTimeDifference();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
