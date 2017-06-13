package com.azlicn.task.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.azlicn.task.entity.Task;
import com.azlicn.task.service.TaskService;
import com.azlicn.task.util.CustomErrorType;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200"})
@Api(description="Operations pertaining to tasks in Task Management System")
public class TaskController {
	
	@Autowired
	private TaskService taskService;
	
	@RequestMapping(value = "/task",method = RequestMethod.POST)
	@ApiOperation(value = "Create a new task")
	public ResponseEntity<?> createTask(@RequestBody Task task) {
		
		if (taskService.isTaskExist(task)) {
			return new ResponseEntity(new CustomErrorType("Unable to create task. "
					+ "A task with name " + task.getName() + " already exist"), HttpStatus.CONFLICT);
		}		
		taskService.saveOrUpdateTask(task);
		return new ResponseEntity<String>("Task saved successfully", HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/task",method = RequestMethod.GET)
	@ApiOperation(value = "View a list of available tasks")
	public ResponseEntity<List<Task>> getTasks(){
		
		List<Task> tasks = taskService.getTasks();
		if (tasks.isEmpty()){
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Task>>(tasks, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/task/{id}", method = RequestMethod.GET)
	@ApiOperation(value = "Get a task")
	public ResponseEntity<?> getTask(@PathVariable("id") Integer id){

		Task task = taskService.getTask(id);
		if (task == null) {
			return new ResponseEntity<>(new CustomErrorType("Task with id " + id
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Task>(task, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/task/{id}", method = RequestMethod.PUT)
	@ApiOperation(value = "Update a task")
	public ResponseEntity<?> updateTask(@PathVariable("id") Integer id, @RequestBody Task task) {
		
		Task currentTask = taskService.getTask(id);
		if (currentTask == null) {
			return new ResponseEntity(new CustomErrorType("Unable to update. User with id " 
					+ id +" not found"), HttpStatus.NOT_FOUND);
		}
		currentTask.setName(task.getName());
		currentTask.setCompleted(task.getCompleted());
		taskService.saveOrUpdateTask(currentTask);
		return new ResponseEntity<Task>(currentTask, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/task/{id}", method = RequestMethod.DELETE)
	@ApiOperation(value = "Delete a task")
	public ResponseEntity<?> deleteTask(@PathVariable("id") Integer id) {
		
		Task task = taskService.getTask(id);
		if (task == null) {
			return new ResponseEntity(new CustomErrorType("Unable to delete. "
					+ "User with id " + id +" not found"), HttpStatus.NOT_FOUND);
		}
		taskService.removeTask(id);
		return new ResponseEntity<Task>(HttpStatus.NO_CONTENT);
	}
	
}
