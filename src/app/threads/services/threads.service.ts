import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Thread } from '../models/thread.model';

@Injectable()
export class ThreadsService {
  getThreads(): Observable<Thread[]> {
    const threads = [
      { id: '1', title: 'First thread' },
      { id: '2', title: 'Second thread' },
      { id: '3', title: 'Third thread' },
    ];
    return of(threads).pipe(delay(2000));
  }

  addThread(thread: Thread): Observable<Thread> {
    return of(thread).pipe(delay(2000));
  }

  updateThread(thread: Thread){
    const threadData = {
      [thread.id]: { title: thread.title },
    };
    return of(threadData).pipe(delay(2000));
  }
}