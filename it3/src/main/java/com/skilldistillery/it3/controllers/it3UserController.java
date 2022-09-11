package com.skilldistillery.it3.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.it3.entities.User;
import com.skilldistillery.it3.services.it3GameService;
import com.skilldistillery.it3.services.it3Service;
import com.skilldistillery.it3.services.it3UserService;

@RestController
@RequestMapping("api")
public class it3UserController {

	@Autowired
	private it3Service its;
	@Autowired
	private it3UserService itsUser;
	@Autowired
	private it3GameService itsGame;
	
	@GetMapping("user")
	public List<User> findAllUsers(){
		return itsUser.findAll();
	}
	
	@PostMapping("user")
	public User createNewGame(@RequestBody User user, HttpServletRequest req, HttpServletResponse res) {
		User createdUser= itsUser.createUser(user);
		if(createdUser==null) {
			res.setStatus(404);
		}else {
			res.setStatus(201);
			StringBuffer url= req.getRequestURL();
			url.append("/").append(createdUser.getId());
			res.setHeader("Location", url.toString());
		}
		return createdUser;
	}
	
	@PutMapping(path="user/{id}")
	public User update(@PathVariable int id, @RequestBody User user, HttpServletResponse res) {
		try {
			user=itsUser.updateUser(id, user);
			if(user==null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			user=null;
		}
		return user;
	}
	
	@DeleteMapping("user/{id}")
	public void deleteComment(@PathVariable int id, HttpServletResponse res) {
		boolean deleted= itsUser.deleteUser(id);
		if(deleted) {
			res.setStatus(204);
		}else {
			res.setStatus(404);
		}
	}
	
	@GetMapping("user/{username}/{password}")
	public User login(@PathVariable String username, @PathVariable String password, HttpServletResponse res) {
		User user=itsUser.findByUsernameANDPassword(username, password);
		if(user==null) {
			res.setStatus(400);
			
		}else {
			res.setStatus(200);
		}
		return user;
	}
	
}
