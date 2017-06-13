import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCheckboxModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule} from '@angular/material';

import { AppComponent } from './app.component';
import { TaskService } from './task.service';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  declarations: [
    AppComponent,
      TaskListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    MdButtonModule, MdCheckboxModule, MdCardModule, 
    MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
