package com.azlicn.task.config;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DBInitializeConfig {

	@Autowired
	private DataSource dataSource;
	
	@PostConstruct
	public void initialize(){
		try {
			Connection connection = dataSource.getConnection();
			Statement statement = connection.createStatement();
			statement.execute("DROP TABLE IF EXISTS Tasks");
			statement.executeUpdate(
					"CREATE TABLE Tasks(" +
					"id INTEGER Primary key, " +
					"name varchar(255) not null," +
					"completed boolean not null default 0)"
					);
			statement.executeUpdate(
					"INSERT INTO Tasks " +
					"(name,completed) " +
					"VALUES " + "('Create Task Assignment', 0)"
					);
			statement.close();
			connection.close();
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
