import { createReducer, on } from "@ngrx/store";

import { initialState, threadsAdapter } from "./threads.state";
import * as threadActions from "./actions";

export const threadsReducers = createReducer(
  initialState,
  on(threadActions.getThreads, (state) => ({ ...state, isLoading: true })),
  on(threadActions.getThreadFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(threadActions.geThreadSuccess, (state, action) => {
    return threadsAdapter.setAll(action.threads, {
      ...state,
      isLoading: false,
    });
  }),
  on(threadActions.addThread, (state) => ({ ...state, isAdding: true })),
  on(threadActions.addThreadSuccess, (state, action) => {
    return threadsAdapter.addOne(action.thread, {
      ...state,
      isAdding: false,
    });
  }),
  on(threadActions.addThreadFailure, (state, action) => ({
    ...state,
    isAdding: false,
    error: action.error,
  })),
  on(threadActions.updateThread, (state) => ({ ...state, isUpdating: true })),
  on(threadActions.updateThreadSuccess, (state, action) => {
    return threadsAdapter.updateOne(action.thread, {
      ...state,
      isUpdating: false,
    });
  }),
  on(threadActions.updateThreadFailure, (state, action) => ({
    ...state,
    isUpdating: false,
    error: action.error,
  })),
);
