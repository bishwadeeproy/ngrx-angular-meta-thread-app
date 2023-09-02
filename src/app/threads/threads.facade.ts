import { Injectable } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Input, Output, EventEmitter } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "src/app/core/state/app-state";
import { Thread } from "./models/thread.model";
import * as ThreadsActions from "./store/actions";
import {
  errorSelector,
  isLoadingSelector,
  getThreads,
  isAddingSelector,
  isUpdatingSelector,
  getThreadById
} from "./store/selectors";

@Injectable()
export class ThreadsFacade {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  threads$: Observable<Thread[]>;
  slectedThreadId!: string;
  isAdding$: Observable<boolean>;
  isUpdating$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.threads$ = this.store.pipe(select(getThreads));
    this.isAdding$ = this.store.pipe(select(isAddingSelector));
    this.isUpdating$ = this.store.pipe(select(isUpdatingSelector));
  }

  loadAll(){
    this.store.dispatch(ThreadsActions.getThreads());
  }

  getThread(threadId: string):  Observable<Thread | undefined>{
    return this.store.select(getThreadById(threadId))
  }

  add(thread: Thread){
    this.store.dispatch(ThreadsActions.addThread({ thread: thread }));
  }

  update(thread: Thread){
    this.store.dispatch(ThreadsActions.updateThread({ thread: thread }));
  }


}
