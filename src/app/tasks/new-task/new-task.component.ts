import { Component, EventEmitter, inject, Output, Input } from '@angular/core';
import { type NewTaskData } from '../task/task.model';
import { TasksService } from '../tasks.service';

// standalone can used module too
@Component({
  selector: 'app-new-task',
  standalone: false,
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;
  @Output() close = new EventEmitter<void>();
  // @Output() add = new EventEmitter<NewTaskData>();
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  // Inject function: another way for Dependency Injection compared to constructor, to inject a dependency, and provide it as a value for the property
  private tasksService = inject(TasksService);

  // way2: use signal, when using signal with [(ngModel)], you don't need () in the template
  // enteredTitle = signal('');
  // enteredSummary = signal('');
  // enteredDate = signal('');

  onCancel() {
    this.close.emit();
  }

  //If you import FormsModule, the form tag will not have the default submit behavior
  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        date: this.enteredDate,
      },
      this.userId
    );
    this.close.emit();
    // this.add.emit({
    //   title: this.enteredTitle,
    //   summary: this.enteredSummary,
    //   date: this.enteredDate,
    // });
  }
}
