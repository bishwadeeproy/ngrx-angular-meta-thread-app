import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Thread } from "./../../models/thread.model";
import { ThreadsFacade } from "../../threads.facade";

@Component({
  selector: "app-add-thread",
  templateUrl: "./add-thread.component.html",
  styleUrls: ["./add-thread.component.css"],
})
export class AddThreadComponent implements OnInit {
  isAdding$: Observable<boolean>;

  constructor(private threadsFacade: ThreadsFacade) {
    this.isAdding$ = threadsFacade.isAdding$;
  }

  ngOnInit(): void {}

  onAddThread() {
    const thread: Thread = {
      id: "id-" + Math.random() * 100,
      title: "Thread " + Math.random() * 100,
    };

    this.threadsFacade.add(thread);
  }
}
