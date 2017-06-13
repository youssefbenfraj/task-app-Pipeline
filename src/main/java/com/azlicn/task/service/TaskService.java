package com.azlicn.task.service;

import java.util.List;

import com.azlicn.task.entity.Task;

public interface TaskService {

	public Task saveOrUpdateTask(Task task);
	public Task getTask(Integer id);
	public void removeTask(Integer id);
	public List<Task> getTasks();  
	public boolean isTaskExist(Task task);
	
	
}
