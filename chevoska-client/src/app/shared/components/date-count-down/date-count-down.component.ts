import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-date-count-down',
  templateUrl: './date-count-down.component.html',
  styleUrls: ['./date-count-down.component.scss'],
})
export class DateCountDownComponent implements OnInit, OnDestroy {
  @Input() day!: any;
  private subscription!: Subscription;
  public dateNow = new Date();
  public dDay!: Date;

  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference!: any;
  public secondsToDday!: any;
  public minutesToDday!: any;
  public hoursToDday!: any;
  public daysToDday!: any;

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: any) {
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
    this.subscription = interval(1000).subscribe(x => {
      this.getTimeDifference();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
