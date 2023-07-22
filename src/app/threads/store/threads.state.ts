import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Thread } from "../models/thread.model";

export interface ThreadState extends EntityState<Thread> {
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean,
  error: string | null;
}

export const threadsAdapter = createEntityAdapter<Thread>({
  selectId: (e) => e.id,
});

export const initialState: ThreadState = threadsAdapter.getInitialState({
  isLoading: false,
  isAdding: false,
  isUpdating: false,
  error: null,
});