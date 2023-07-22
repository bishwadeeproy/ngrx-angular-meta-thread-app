import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ThreadsService } from './services/threads.service';
import { ThreadsEffects } from './store/effects';
import { threadsReducers } from './store/reducers';
import { ThreadsListComponent } from './components/threads-list/threads-list.component';
import { AddThreadComponent } from './components/add-thread/add-thread.component';
import { UpdateThreadComponent } from './components/update-thread/update-thread.component';
import { ThreadsComponent } from './threads.component';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('threads', threadsReducers),
    EffectsModule.forFeature([ThreadsEffects]),
  ],
  providers: [ThreadsService],
  declarations: [ThreadsListComponent, AddThreadComponent, UpdateThreadComponent, ThreadsComponent],
  exports: [ThreadsComponent],
})
export class ThreadsModule { }
