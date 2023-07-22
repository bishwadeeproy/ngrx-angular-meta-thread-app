import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Update } from '@ngrx/entity';
import { catchError, map, mergeMap, of, tap, switchMap } from "rxjs";
import { ToastrService } from "ngx-toastr";

import { ThreadsService } from "../services/threads.service";
import * as threadActions from "./actions";

import * as notificationActions from "./notifications.actions";
import { Thread } from "../models/thread.model";

@Injectable()
export class ThreadsEffects {
  getThreads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(threadActions.getThreads),
      mergeMap(() => {
        return this.threadsService.getThreads().pipe(
          map((threads) => threadActions.geThreadSuccess({ threads })),
          catchError((error) =>
            of(threadActions.getThreadFailure({ error: error.message }))
          )
        );
      })
    )
  );

  addThread$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(threadActions.addThread),
      mergeMap((action) => {
        return this.threadsService.addThread(action.thread).pipe(
          switchMap((data) => {
            return [
              threadActions.addThreadSuccess({ thread: data }),
              notificationActions.displaySuccess({
                title: "Thread Added",
                description: "A new thread is added to thread list.",
              }),
            ];
          })
        );
      })
    );
  });


  updateThread$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(threadActions.updateThread),
      mergeMap((action) => {
        return this.threadsService.updateThread(action.thread).pipe(
          switchMap((data) => {
            const updatedPost: Update<Thread> = {
              id: action.thread.id,
              changes: {
                ...action.thread,
              },
            };
            return [
              threadActions.updateThreadSuccess({ thread: updatedPost }),
              notificationActions.displaySuccess({
                title: "Thread Updated",
                description: "Thread updated successfully.",
              }),
            ];
          })
        );
      })
    );
  });

  displaySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(notificationActions.displaySuccess),
        tap((action) => {
          this.toastr.success(action.description, action.title);
        })
      ),
    { dispatch: false }
  );

  displayWarning$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(notificationActions.displayWarning),
        tap((action) => {
          this.toastr.warning(action.description, action.title);
        })
      ),
    { dispatch: false }
  );

  displayError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(notificationActions.displayError),
        tap((action) => {
          this.toastr.error(action.description, action.title);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private toastr: ToastrService,
    private threadsService: ThreadsService
  ) {}
}
