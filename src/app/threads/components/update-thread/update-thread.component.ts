import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";

import { Thread } from "../../models/thread.model";
import { ThreadsFacade } from "../../threads.facade";

@Component({
  selector: "app-update-thread",
  templateUrl: "./update-thread.component.html",
  styleUrls: ["./update-thread.component.css"],
})
export class UpdateThreadComponent implements OnInit {
  @Input() threadId!: string;

  isUpdating$: Observable<boolean>;

  constructor(private threadsFacade: ThreadsFacade) {
    this.isUpdating$ = threadsFacade.isUpdating$;
  }

  ngOnInit(): void {}

  onUpdateThread() {
    if (!this.threadId) {
      return;
    }
    const thread: Thread = {
      id: this.threadId,
      title: "Thread updated " + Math.random() * 100,
    };
    this.threadsFacade.update(thread);
  }
}
