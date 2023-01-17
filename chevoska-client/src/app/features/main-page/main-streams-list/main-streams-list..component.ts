import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MainPageService } from '../main-page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { QueryParams } from '../../../core/interfaces/query-params.interfaces';
import { STREAMS_COLUMNS } from '../../streams-list/constants/streams.constants';
import { Order } from '../../../core/enums/filters.enum';
import * as qs from 'qs';
import { finalize } from 'rxjs';
import { StreamsForUserList } from '../../../core/models/streams/stream-for-user.model';
import { StreamsForClientList } from '../../../core/models/streams/stream-for-client.model';

@UntilDestroy()
@Component({
  selector: 'app-main-streams-list',
  templateUrl: './main-streams-list.component.html',
  styleUrls: ['./main-streams-list..component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(
        '* => *',
        useAnimation(fadeIn, {
          params: { timing: 0.4, delay: 0 },
        })
      ),
    ]),
  ],
})
export class MainStreamsListComponent {
  rootPath = 'main';
  queryParams!: QueryParams;
  streams = [] as null | StreamsForClientList[];
  displayedColumns: string[] = [...STREAMS_COLUMNS];

  state = {
    order: {
      sortBy: 'id',
      sortOrder: Order.ASC,
    },
    pagination: {
      total: 0,
      page: 1,
      limit: 9,
      totalPages: 0,
    },
    filters: {},
  };
  loading = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private mainService: MainPageService) {
    const { pagination, order } = this.state;
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = qs.parse(qs.stringify(params)) as QueryParams;

      if (!Object.keys(params).length) {
        const { page, limit } = pagination;
        const { sortBy, sortOrder } = order;
        this.router.navigateByUrl(`${this.rootPath}?${qs.stringify({ page, limit, sortBy, sortOrder })}`);
      } else {
        const { page, limit } = this.queryParams;
        pagination.page = +page;
        pagination.limit = +limit;

        this.loadStreams(this.queryParams);
      }
    });
  }

  loadStreams(params: QueryParams) {
    this.loading = true;

    this.mainService
      .getAllStreams(params)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: data => {
          this.streams = data.results;
          this.state.pagination.page = data.page;
          this.state.pagination.total = data.total;
          this.state.pagination.totalPages = data.totalPages;
        },
        error: () => {},
      });
  }

  navigate(queryParams: QueryParams) {
    return this.router.navigateByUrl(
      `${this.rootPath}?${qs.stringify({
        ...this.queryParams,
        ...queryParams,
      })}`
    );
  }

  handleChangePage({ page, pageSize }: { page: number; pageSize: number }) {
    const {
      pagination,
      order: { sortOrder, sortBy },
    } = this.state;
    pagination.page = page;
    pagination.limit = pageSize;
    this.navigate({ page: String(page), limit: String(pageSize), sortOrder, sortBy });
  }
}
