import { STREAM_STATUSES } from '../enums/streams.enum';

export const STREAMS_COLUMNS = ['Title', 'Starting Date', 'Private', ''];

export const SORT_BY_STREAMS_LIST = {
  title: 'Sort By',
  name: 'sortBy',
  queryName: 'sortBy',
  options: [
    { name: 'Start Date \u2191', value: 'startDate_ASC' },
    { name: 'Start Date \u2193', value: 'startDate_DESC' },
    { name: 'Content Number \u2191', value: 'id_ASC' },
    { name: 'Content Number \u2193', value: 'id_DESC' },
  ],
};

export const STREAMS_DEFAULT_FILTERS = {
  sortBy: { name: 'Content Number \u2191', value: 'id_ASC' },
};

export const STREAMS_PRIVACY_FILTER = [
  { id: 1, title: 'private' },
  { id: 2, title: 'public' },
];

export const STREAMS_STATUSES_FILTER = [
  { id: 1, title: STREAM_STATUSES.PENDING },
  { id: 2, title: STREAM_STATUSES.ACTIVE },
  { id: 3, title: STREAM_STATUSES.DONE },
];
