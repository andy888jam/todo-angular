import { NewTaskData } from './task/task.model';
import { Injectable } from '@angular/core';

// service is a class that provides a way to manage data and functionality
// @Injectable: tells Angular that this class should be injected into other services or components
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  // private: only accessible within the class
  private task = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ];

  // when a class is instantiated, the constructor is called
  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.task = JSON.parse(tasks);
    }
  }

  getUsersTasks(userId: string) {
    return this.task.filter((task) => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string) {
    this.task.push({
      id: new Date().getTime().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    });
    this.saveTasks();
  }

  removeTask(id: string) {
    this.task = this.task.filter((task) => task.id !== id);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.task));
  }
}
