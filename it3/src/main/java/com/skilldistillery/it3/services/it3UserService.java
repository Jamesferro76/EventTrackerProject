package com.skilldistillery.it3.services;

import java.util.List;

import com.skilldistillery.it3.entities.User;

public interface it3UserService {
	
	User createUser(User user);

	boolean deleteUser(int userId);

	User updateUser(int id, User user);

	List<User> findAll();

}
