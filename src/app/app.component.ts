import { Component } from '@angular/core';

import { DUMMY_USERS } from './dummy-user';

// if you want to register/use a component in the html, you need to do that in ts file
@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;
  selectedUserId?: string;

  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserId);
  }

  onSelectUser(id: string) {
    this.selectedUserId = id;
  }
}

// you can use ng generate component <component-name> to create a new component
// ng g c user
