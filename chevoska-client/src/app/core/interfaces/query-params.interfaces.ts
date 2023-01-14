export interface QueryParams {
  order: {
    sortBy: string;
    sortOrder: string;
  };
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  filters: any;
}
