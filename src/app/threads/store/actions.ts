import { createAction, props } from "@ngrx/store";
import { Update } from '@ngrx/entity';

import { Thread } from "../models/thread.model";

export const getThreads = createAction("[Threads] Get Threads");
export const geThreadSuccess = createAction(
  "[Threads] Get Threads success",
  props<{ threads: Thread[] }>()
);
export const getThreadFailure = createAction(
  "[Threads] Get Threads failure",
  props<{ error: string }>()
);

export const addThread = createAction(
  "[Threads] Add Thread",
  props<{ thread: Thread }>()
);
export const addThreadSuccess = createAction(
  "[Threads] Add Thread Success",
  props<{ thread: Thread }>()
);
export const addThreadFailure = createAction(
  "[Threads] Add Thread failure",
  props<{ error: string }>()
);


export const updateThread = createAction(
  "[Threads] Update Thread",
  props<{ thread: Thread }>()
);
export const updateThreadSuccess = createAction(
  "[Threads] Update Thread Success",
  props<{ thread: Update<Thread> }>()
);
export const updateThreadFailure = createAction(
  "[Threads] Update Thread failure",
  props<{ error: string }>()
);


