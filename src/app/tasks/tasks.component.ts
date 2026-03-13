import { Component, Input } from '@angular/core';
import { type NewTaskData } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  // ! is used to tell TypeScript that the value won't be null or undefined, so don't need to check it for now
  // ? means this property is optional and may be undefined
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;

  // way 1 : use ?
  // @Input() name?: string;
  // way2: use union
  // @Input() name: string | undefined;

  isAddingTask = false;
  //  if we use "new", then we will initialize the different instance in different components, which are not ideal
  // private tasksService = new TasksService();

  // "inject" (verb.) the service: tell Angular to create the instance of the service. And you can use this one instance in different components to share the same data and functionality
  // Dependency Injection(Pattern Name): You tell Angular which type of value you need and Angular creates it and provides it as an argument

  //private placement 1:
  // private tasksService: TasksService;

  // constructor( tasksService: TasksService) {
  //   this.tasksService = tasksService;
  // }
  //private placement 2: shortcut by Angular, will automatically create a property with the same name
  constructor(private tasksService: TasksService) {}

  get selectedUserTasks() {
    return this.tasksService.getUsersTasks(this.userId);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }
}
