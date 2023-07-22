import { threadsAdapter, ThreadState } from "./threads.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const _STATE_NAME = "threads";
const getThreadState = createFeatureSelector<ThreadState>(_STATE_NAME);
export const threadsSelectors = threadsAdapter.getSelectors();

export const getThreads = createSelector(
  getThreadState,
  threadsSelectors.selectAll
);
export const getThreadEntities = createSelector(
  getThreadState,
  threadsSelectors.selectEntities
);

export const getThreadById = (id: any) => createSelector(
  getThreadEntities,
  entities => entities[id]
);

export const selectEntitiesByID = (ids: any[]) => createSelector(
  getThreadEntities,
  entities => ids.map(id => entities[id])
);

export const isLoadingSelector = createSelector(
  getThreadState,
  (state) => state.isLoading
);

export const errorSelector = createSelector(
  getThreadState,
  (state) => state.error
);

export const isAddingSelector = createSelector(
  getThreadState,
  (state) => state.isAdding
);

export const isUpdatingSelector = createSelector(
  getThreadState,
  (state) => state.isUpdating
);

