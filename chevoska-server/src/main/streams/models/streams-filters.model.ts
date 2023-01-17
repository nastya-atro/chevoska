import { Privacy } from "../../../common/constants/privacy.constants";
import { StreamStatuses } from "../../../common/constants/statuses.constant";

export interface StreamsFilters {
  q: string;
  privacy: Privacy[];
  statuses: StreamStatuses[];
}
