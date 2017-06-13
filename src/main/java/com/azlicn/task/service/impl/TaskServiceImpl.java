package com.azlicn.task.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.azlicn.task.entity.Task;
import com.azlicn.task.repo.TaskRepository;
import com.azlicn.task.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	private TaskRepository taskRepository;
	
	@Override
	public Task saveOrUpdateTask(Task task) {
		return taskRepository.save(task);
	}

	@Override
	public Task getTask(Integer id) {
		return taskRepository.findOne(id);
	}

	@Override
	public void removeTask(Integer id) {
		taskRepository.delete(id);
	}

	@Override
	public List<Task> getTasks() {
		return (List<Task>) taskRepository.findAll();
	}

	@Override
	public boolean isTaskExist(Task task) {
		return taskRepository.findByName(task.getName()) != null;
	}
	
	
}
