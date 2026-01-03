import { Component, Input, Output, EventEmitter, output } from '@angular/core';

// you can add "type" keyword to make it more readable
import { type User } from './user.model';

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

// // outsource type
// most of the time,interface and type are interchangeable, but in Angular project we use interface more often
// type User = {
//   id: string;
//   avatar: string;
//   name: string;
// };

// interface can only define object type but type can define any type
// interface User {
//   id: string;
//   avatar: string;
//   name: string;
// }

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
// we can access selectedUser in template
// ! is used to tell TypeScript that the value is not null or undefined
// required: true is used to tell Angular that the value is required, without this, you are lying to TypeScript as it can be undefined or null
export class UserComponent {
  // Input as a decorator
  // @Input({ required: true }) id!: string;
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;

  // define object type
  @Input({ required: true }) user!: User;
  @Input({ required: true }) selected!: boolean;
  @Output() select = new EventEmitter<string>();

  // way2: output() (Notice that output doesn't create a signal like input, it is an EventEmitter)  // the template still use the same way
  // select = output<string>();

  // input as a signal(function)
  //<> is a typescript thing, eg <T> is a generic type, T is a placeholder for a type
  // if it is required you can't set the initial value, you have to "set it" in the template
  // can't change the value of the input, you have to set it in the template(read only)
  // avatar = input.required<string>();
  // name = input.required<string>();

  // imagePath = computed(() => `assets/users/${this.avatar()}`);
  get imagePath() {
    return `assets/users/${this.user.avatar}`;
  }

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}

// // we can access selectedUser in template
// export class UserComponent {
//   // selectedUser = DUMMY_USERS[randomIndex];
//   selectedUser = signal(DUMMY_USERS[randomIndex]);
//   // only compute the image path when the Signal used inside changes
//   imagePath = computed(() => `assets/users/${this.selectedUser().avatar}`);
//   // private selectedUser = DUMMY_USERS[randomIndex]; // only available in this class cannot be accessed in template

//   // when using getter, you use it like a property, not a method, which means you can use it in template without parentheses
//   // get imagePath() {
//   //   return `assets/users/${this.selectedUser.avatar}`;
//   // }

//   onSelectUser() {
//     const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
//     this.selectedUser.set(DUMMY_USERS[randomIndex]);
//     // this.selectedUser = DUMMY_USERS[randomIndex];
//   }
// }
