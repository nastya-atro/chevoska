import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { StreamsService } from './streams.service';
import * as qs from 'qs';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NotifyService } from '../../shared/modules/notifications/notify.service';
import { StreamsList } from '../../core/models/stream.model';
import { Order } from '../../core/enums/filters.enum';
import { STREAMS_COLUMNS } from './constants/streams.constants';
import { QueryParams } from '../../core/interfaces/query-params.interfaces';

@UntilDestroy()
@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss'],
})
export class StreamsComponent {
  rootPath = 'streams';
  queryParams!: QueryParams;
  streams!: null | StreamsList[];
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

  constructor(
    private notifyService: NotifyService,
    private streamService: StreamsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
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

    this.streamService
      .getStreams(params)
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

  removeStream(id: number) {
    this.streamService
      .removeStream(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.notifyService.notifier.success('stream deleted successfully');
          this.loadStreams(this.queryParams);
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
