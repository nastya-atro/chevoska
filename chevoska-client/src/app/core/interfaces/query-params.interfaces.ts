import { Order } from '../enums/filters.enum';

export interface QueryParams {
  page: string;
  limit: string;
  sortBy: string;
  sortOrder: Order.ASC | Order.DESC;
  filters?: { [key: string]: any };
  [p: string]: any;
}
