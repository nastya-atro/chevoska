import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { StreamsService } from './streams.service';
import * as qs from 'qs';
import debounce from 'lodash.debounce';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NotifyService } from '../../shared/modules/notifications/notify.service';
import { Order } from '../../core/enums/filters.enum';
import { FilterOptions, QueryParams } from '../../core/interfaces/query-params.interfaces';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { StreamsForUserList } from '../../core/models/streams/stream-for-user.model';
import {
  SORT_BY_STREAMS_LIST,
  STREAMS_COLUMNS,
  STREAMS_DEFAULT_FILTERS,
  STREAMS_PRIVACY_FILTER,
  STREAMS_STATUSES_FILTER,
} from '../../core/constants/main-streams.constants';

@UntilDestroy()
@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss'],
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
export class StreamsComponent {
  rootPath = 'streams';
  queryParams!: QueryParams;
  streams!: null | StreamsForUserList[];
  displayedColumns: string[] = [...STREAMS_COLUMNS];

  filtersOptions = {
    privacy: [...STREAMS_PRIVACY_FILTER],
    statuses: [...STREAMS_STATUSES_FILTER],
    sortBy: { ...SORT_BY_STREAMS_LIST },
  };
  defaultFilters = { ...STREAMS_DEFAULT_FILTERS };
  selectedPrivacy = [] as any;
  selectedStatuses = [] as FilterOptions[];

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
    filters: {
      privacy: [],
      statuses: [],
      q: '',
    } as any,
  };

  loading = false;

  constructor(
    private notifyService: NotifyService,
    private streamService: StreamsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.handleSearch = debounce(this.handleSearch, 700);

    const { pagination, order, filters } = this.state;
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = qs.parse(qs.stringify(params)) as QueryParams;

      if (!Object.keys(params).length) {
        const { page, limit } = pagination;
        const { sortBy, sortOrder } = order;
        this.router.navigateByUrl(`${this.rootPath}?${qs.stringify({ page, limit, sortBy, sortOrder, ...filters })}`);
      } else {
        const { page, limit, q, privacy, statuses } = this.queryParams;
        pagination.page = +page;
        pagination.limit = +limit;
        filters.q = q || '';
        filters.privacy = privacy || [];
        filters.statuses = statuses || [];

        this.selectedPrivacy = this.filtersOptions.privacy.filter(el => privacy?.join(', ').includes(el.title)) || [];
        this.selectedStatuses =
          this.filtersOptions.statuses.filter(el => statuses?.join(', ').includes(el.title)) || [];

        this.loadStreams(this.queryParams);
      }
    });
  }

  loadStreams(params: QueryParams) {
    this.loading = true;

    this.streamService
      .getMyStreams(params)
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
      filters,
    } = this.state;
    pagination.page = page;
    pagination.limit = pageSize;
    this.navigate({ page, limit: pageSize, sortOrder, sortBy, ...filters });
  }

  handleChangeSortByFilter(item: any) {
    const { value } = item;
    const [sortBy, sortOrder] = value.split('_');
    const {
      pagination: { limit },
      order,
      filters,
    } = this.state;
    order.sortOrder = sortOrder;
    order.sortBy = sortBy;

    this.navigate({ sortBy, sortOrder, page: '1', limit, ...filters });
  }

  handleMultiselect({ selectedOptions, entity }: any) {
    const {
      pagination: { limit },
      order: { sortOrder, sortBy },
      filters,
    } = this.state;

    filters[entity] = selectedOptions.map((el: any) => el.title);

    this.navigate({
      sortOrder,
      sortBy,
      page: 1,
      limit,
      ...filters,
    });
  }

  handleSearch(event: any) {
    const {
      pagination: { limit },
      filters,
      order: { sortOrder, sortBy },
    } = this.state;
    filters.q = event.target.value;

    this.navigate({
      sortOrder,
      sortBy,
      page: 1,
      limit,
      ...filters,
    });
  }
}
