import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class StatisticStreamService implements OnDestroy {
  constructor(private router: Router) {}

  ngOnDestroy(): void {}
}
