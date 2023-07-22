import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-threads",
  templateUrl: "./threads.component.html",
  styleUrls: ["./threads.component.css"],
})
export class ThreadsComponent implements OnInit {
  selectedThreadId!: string;
  
  constructor() {}

  ngOnInit(): void {}

  updateThread(threadId: string) {
    console.log("in parent", threadId);

    this.selectedThreadId = threadId;
  }
}
