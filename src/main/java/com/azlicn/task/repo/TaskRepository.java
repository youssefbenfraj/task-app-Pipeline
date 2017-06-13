package com.azlicn.task.repo;

import org.springframework.data.repository.CrudRepository;

import com.azlicn.task.entity.Task;

public interface TaskRepository extends CrudRepository<Task, Integer> {

	Task findByName(String name);
}
