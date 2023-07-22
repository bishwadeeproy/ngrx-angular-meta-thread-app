import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Input, Output, EventEmitter } from "@angular/core";

import { updateThread } from "./../../store/actions";
import { Thread } from "./../../models/thread.model";

import { AppState } from "src/app/core/state/app-state";
import { Observable } from "rxjs";

import {
  errorSelector,
  isUpdatingSelector,
  getThreadById,
} from "../../store/selectors";

@Component({
  selector: "app-update-thread",
  templateUrl: "./update-thread.component.html",
  styleUrls: ["./update-thread.component.css"],
})
export class UpdateThreadComponent implements OnInit, OnChanges {
  @Input() threadId!: string;

  thread!: Thread;
  isUpdating$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isUpdating$ = this.store.pipe(select(isUpdatingSelector));
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.store.select(getThreadById(this.threadId)).subscribe((thread) => {
      console.log(thread);
      if (thread) {
        this.thread = thread;
      }
    });
  }

  onUpdateThread() {
    if (!this.thread) {
      return;
    }
    const thread: Thread = {
      ...this.thread,
      title: "Thread updated " + Math.random() * 100,
    };
    this.store.dispatch(updateThread({ thread: thread }));
  }
}
