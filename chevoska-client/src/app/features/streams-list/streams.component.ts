import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { StreamsService } from './streams.service';
import * as qs from 'qs';
import * as tableConstant from '../../core/enums/table.constants';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { finalize } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss'],
})
export class StreamsComponent {
  readonly tableConstant = tableConstant;
  rootPath = 'streams';

  queryParams!: Params;

  streams!: null | any;
  displayedColumns: string[] = [...this.tableConstant.STREAMS_COLUMNS];

  state = {
    order: {
      sortBy: 'id',
      sortOrder: this.tableConstant.ASC,
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

  constructor(private streamService: StreamsService, private activatedRoute: ActivatedRoute, private router: Router) {
    const { pagination, order } = this.state;
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = qs.parse(qs.stringify(params));

      if (!Object.keys(params).length) {
        const { page, limit } = pagination;
        const { sortBy, sortOrder } = order;
        this.router.navigateByUrl(`${this.rootPath}?${qs.stringify({ page, limit, sortBy, sortOrder })}`);
      } else {
        const { page, limit } = this.queryParams;
        pagination.page = +page;
        pagination.limit = +limit;

        this.loadStreams(params);
      }
    });
  }

  loadStreams(params: any) {
    this.loading = true;

    this.streamService
      .getStreams(params)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (data: any) => {
          this.streams = data.results;
          this.state.pagination.page = data.page;
          this.state.pagination.total = data.total;
          this.state.pagination.totalPages = data.totalPages;
        },
        error: () => {},
      });
  }

  navigate(queryParams: any) {
    return this.router.navigateByUrl(
      `${this.rootPath}?${qs.stringify({
        ...this.queryParams,
        ...queryParams,
      })}`
    );
  }

  handleChangePage({ page, pageSize }: { page: number; pageSize: number }) {
    const { pagination } = this.state;
    pagination.page = page;
    pagination.limit = pageSize;
    this.navigate({ page: page, limit: pageSize });
  }
}
