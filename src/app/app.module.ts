import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';

// declarations: is used to declare the non-standalone components that are used in the module
// bootstrap: the root component that Angular should bootstrap
// imports: is used to enable standalone components and also for including other modules
// standalone and module can combine together
// @NgModule({
//   declarations: [AppComponent],
//   bootstrap: [AppComponent],
//   imports: [BrowserModule, HeaderComponent, UserComponent, TasksComponent],
// })
@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, SharedModule, TasksModule], //date pipe is in BrowserModule so no need to import it here
})
export class AppModule {
  constructor() {
    console.log('AppModule initialized');
  }
}
