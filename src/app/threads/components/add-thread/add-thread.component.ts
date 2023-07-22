import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";

import { addThread } from "./../../store/actions";
import { Thread } from "./../../models/thread.model";

import { AppState } from "src/app/core/state/app-state";
import { Observable } from "rxjs";
import { isAddingSelector } from "../../store/selectors";

@Component({
  selector: "app-add-thread",
  templateUrl: "./add-thread.component.html",
  styleUrls: ["./add-thread.component.css"],
})
export class AddThreadComponent implements OnInit {
  isAdding$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isAdding$ = this.store.pipe(select(isAddingSelector));
  }

  ngOnInit(): void {}

  onAddThread() {
    const thread: Thread = {
      id: "id-" + Math.random() * 100,
      title: "Thread " + Math.random() * 100,
    };

    this.store.dispatch(addThread({ thread: thread }));
  }
}
