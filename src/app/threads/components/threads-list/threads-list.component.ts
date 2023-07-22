import { Component, OnInit } from "@angular/core";
import { Input, Output, EventEmitter } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "src/app/core/state/app-state";
import { Thread } from "../../models/thread.model";
import * as ThreadsActions from "../../store/actions";
import {
  errorSelector,
  isLoadingSelector,
  getThreads,
} from "../../store/selectors";

@Component({
  selector: "app-threads-list",
  templateUrl: "./threads-list.component.html",
  styleUrls: ["./threads-list.component.css"],
})
export class ThreadsListComponent implements OnInit {
  @Output() threadSelected: EventEmitter<string> = new EventEmitter<string>();

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  threads$: Observable<Thread[]>;
  slectedThreadId!: string;

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.threads$ = this.store.pipe(select(getThreads));
  }

  ngOnInit(): void {
    this.store.dispatch(ThreadsActions.getThreads());
  }

  onChange(e: any) {
    this.slectedThreadId = e.target.value;
    this.threadSelected.emit(this.slectedThreadId)
  }
}
