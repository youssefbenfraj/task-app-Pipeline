import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {TaskService} from '../task.service';
import {Task} from '../task';

@Component({selector: 'app-task-list', templateUrl: './task-list.component.html', styleUrls: ['./task-list.component.css']})
export class TaskListComponent implements OnInit {

  //Component properties
  allTasks : Task[];
  statusCode : number;
  requestProcessing = false;
  taskIdToUpdate = null;
  processValidation = false;

  //Create form
  taskForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  constructor(private taskService : TaskService) {}

  ngOnInit() {
    this.getAllTasks();
  }

  //Fetch all tasks
  getAllTasks() {
    this
      .taskService
      .getAllTasks()
      .subscribe(data => {
        this.allTasks = data;
        this.backToCreateTask()
      }, 
      errorCode => this.statusCode = errorCode);
  }

  //Handle create and update task
  onTaskFormSubmit(frm) {
    console.log(frm);
    this.processValidation = true;
    if (this.taskForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    this.preProcessConfigurations();
    let name = this
      .taskForm
      .get('name')
      .value
      .trim();
    if (this.taskIdToUpdate === null) {
      //Handle create task
      let task = new Task(null, name, false);
      this
        .taskService
        .createTask(task)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllTasks();
          this.backToCreateTask();
        }, errorCode => this.statusCode = errorCode);
    } else {
      //Handle update task
      let task = new Task(this.taskIdToUpdate, name, false);
      this
        .taskService
        .updateTask(this.taskIdToUpdate, task)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllTasks();
          this.backToCreateTask();
        }, errorCode => this.statusCode = errorCode);
    }
  }

  //Load task by id to edit
  loadTaskToEdit(id : string) {
    this.preProcessConfigurations();
    this
      .taskService
      .getTaskById(id)
      .subscribe(task => {
        this.taskIdToUpdate = task.id;
        this
          .taskForm
          .setValue({name: task.name});
        this.processValidation = true;
        this.requestProcessing = false;
      }, errorCode => this.statusCode = errorCode);
  }

  taskCompleted(task : Task) {
    task.completed = true;
    this
      .taskService
      .updateTask(task.id, task)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.backToCreateTask();
      }, errorCode => this.statusCode = errorCode);
  }

  //Delete task
  deleteTask(id : string) {
    this.preProcessConfigurations();
    this
      .taskService
      .deleteTaskById(id)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.backToCreateTask();
        this.getAllTasks();
      }, errorCode => this.statusCode = errorCode);
  }

  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  //Go back from update to create
  backToCreateTask() {
    this.taskIdToUpdate = null;
    this
      .taskForm
      .reset();
    this.processValidation = false;
  }

}
