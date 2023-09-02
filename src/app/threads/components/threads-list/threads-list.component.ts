import { Component, OnInit } from "@angular/core";
import { Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";

import { Thread } from "../../models/thread.model";
import { ThreadsFacade } from "../../threads.facade";

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

  constructor(private threadsFacade: ThreadsFacade) {
    this.isLoading$ = threadsFacade.isLoading$;
    this.error$ = threadsFacade.error$;
    this.threads$ = threadsFacade.threads$;
  }

  ngOnInit(): void {
    this.threadsFacade.loadAll();
  }

  onChange(e: any) {
    this.slectedThreadId = e.target.value;
    this.threadSelected.emit(this.slectedThreadId)
  }
}
