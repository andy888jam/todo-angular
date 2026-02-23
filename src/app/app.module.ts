import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';

// standalone and module can combine together

// Case 1: if HeaderComponent, UserComponent and TasksComponent are standalone components
// @NgModule({
//   declarations: [AppComponent],
//   bootstrap: [AppComponent],
//   imports: [BrowserModule, HeaderComponent, UserComponent, TasksComponent],
// })

// Case 2: if HeaderComponent, UserComponent and TasksComponent are not standalone components
@NgModule({
  // declarations: is used to declare the non-standalone components that are used in the module
  declarations: [AppComponent, HeaderComponent, UserComponent],
  // bootstrap: the root component that Angular should bootstrap
  bootstrap: [AppComponent],
  // imports: is used to enable standalone components and also for including other modules
  imports: [BrowserModule, SharedModule, TasksModule],
  // date pipe is in BrowserModule so no need to import it here
})
export class AppModule {
  constructor() {
    console.log('AppModule initialized');
  }
}
