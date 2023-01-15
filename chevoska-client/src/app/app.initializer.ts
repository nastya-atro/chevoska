import { filter, Subject, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { AppState } from './store/app.state';
import { ProfileApi } from './core/services/api/profile.api';
import * as appActions from './store/app.actions';

export function appInitializer(usersApiService: ProfileApi, store: Store<AppState>): () => Promise<any> {
  return () => {
    return new Promise(resolve => {
      const loaded$ = new Subject();
      store.dispatch(appActions.startAppInitializer());
      store
        .select((state: AppState) => state.root.isInitialized)
        .pipe(
          filter(isInitialized => isInitialized),
          take(1),
          takeUntil(loaded$)
        )
        .subscribe({
          next: () => {
            loaded$.next(null);
            resolve(true);
          },
        });
    });
  };
}
