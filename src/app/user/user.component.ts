import {
  Component,
  Input,
  Output,
  EventEmitter,
  output,
  input,
  computed,
  signal,
} from '@angular/core';

// you can add "type" keyword to make it more readable
import { type User } from './user.model';
import { DUMMY_USERS } from '../dummy-user';

const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

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
export class UserComponent {
  // 1. Old version syntax of Input and Output

  // ! is used to tell TypeScript that the value is not null or undefined
  // required: true is used to tell Angular that the value is required. Without this word, you are lying to TypeScript as it can be undefined or null
  @Input({ required: true }) user!: User;
  @Input({ required: true }) selected!: boolean;
  @Output() select = new EventEmitter<string>();

  // 2. New version syntax of input (signal) and output (not signal still)

  // input as a signal(function)
  // <> is a typescript thing, eg <T> is a generic type, T is a placeholder for a type
  // If it is required, you can't set the initial value, you have to "set it" in the parents template
  // You can't change the value of the input, you have to set it in the parents' template
  avatar = input.required<string>();
  name = input.required<string>();

  // Notice that output doesn't create a signal like input, it is an EventEmitter  // the template still use the same way
  select_new = output<string>();

  get imagePath() {
    return `assets/users/${this.user.avatar}`;
  }

  // If using Signal, you should use computed:
  imagePath_new = computed(() => `assets/users/${this.avatar()}`);

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}

export class UserComponent2 {
  ///// Define a property that can be used in the template

  //traditional way to define a property that can be used in the template
  selectedUser = DUMMY_USERS[randomIndex];
  // private selectedUser = DUMMY_USERS[randomIndex]; // only available in this class cannot be accessed in template

  // when using signal, you need to call it like a function to get the value
  selectedUser_new = signal(DUMMY_USERS[randomIndex]);

  //// Getter vs Computed

  // when using getter, you use it like a property, not a method, which means you can use it in template without parentheses
  get imagePath_old() {
    return `assets/users/${this.selectedUser.avatar}`;
  }
  // only compute the image path when the Signal used inside changes
  imagePath = computed(() => `assets/users/${this.selectedUser_new().avatar}`);

  //// Update the value of the property
  //Event Handler
  onSelectUser() {
    const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

    this.selectedUser = DUMMY_USERS[randomIndex];

    // signal set method is used to update the value of the signal
    this.selectedUser_new.set(DUMMY_USERS[randomIndex]);
  }
}
