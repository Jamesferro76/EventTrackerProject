package com.skilldistillery.it3.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.it3.entities.Game;
import com.skilldistillery.it3.entities.Rule;
import com.skilldistillery.it3.services.it3Service;

@RestController
@RequestMapping("api")
public class it3Controller {

	@Autowired
	private it3Service its;
	
	@GetMapping("games")
	public List<Game> index(){
		return its.index();
	}
	
	@GetMapping("games/{gameId}/rules")
	public List<Rule> findByGameId(@PathVariable int gameId){
		return its.findByGameId(gameId);
	}
	
	@PostMapping("games/{id}/rules")
	public Rule createNewComment(@PathVariable int id, @RequestBody Rule rule, HttpServletRequest req, HttpServletResponse res) {
		Rule createdRule= its.createRule(id, rule);
		if(createdRule==null) {
			res.setStatus(404);
		}else {
			res.setStatus(201);
			StringBuffer url= req.getRequestURL();
			url.append("/").append(createdRule.getId());
			res.setHeader("Location", url.toString());
		}
		return createdRule;
	}
	
	
	
}