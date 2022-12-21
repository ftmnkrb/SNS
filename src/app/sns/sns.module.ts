import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnsRoutingModule } from './sns-routing.module';
import { SnsComponent } from './sns.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { NewContentComponent } from './new-content/new-content.component';
import { ContentsComponent } from './contents/contents.component';
import { ContentComponent } from './contents/content/content.component';
import { ProfileComponent } from './profile/profile.component';
import { TodoListComponent } from './todo-list/todo-list.component';


@NgModule({
  declarations: [
    SnsComponent,
    NewContentComponent,
    ContentsComponent,
    ContentComponent,
    ProfileComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule,
    SnsRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class SnsModule { }
