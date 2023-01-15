import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DateCountDownService {
  public isStreamEnterAvailable!: boolean;
  public isStreamStarted!: boolean;

  constructor() {}

  startTimeDifferenceCounter(dDay: Date) {
    const streamStartTime = new Date(dDay).getTime();

    return interval(1000).pipe(
      map((response: any) => {
        const currentDate = new Date().getTime();
        this.isStreamEnterAvailable = streamStartTime - currentDate > 21600000;
        this.isStreamStarted = currentDate >= streamStartTime;
        return response;
      })
    );
  }

  setInitialValue(isAvailable: boolean) {
    this.isStreamEnterAvailable = isAvailable;
  }
}
