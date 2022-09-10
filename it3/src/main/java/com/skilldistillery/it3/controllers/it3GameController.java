package com.skilldistillery.it3.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.it3.entities.Game;
import com.skilldistillery.it3.services.it3GameService;
import com.skilldistillery.it3.services.it3Service;

@RestController
@RequestMapping("api")
public class it3GameController {

	@Autowired
	private it3Service its;
	
	@Autowired
	private it3GameService itsGame;
	
	@GetMapping("games")
	public List<Game> index(){
		return itsGame.index();
	}
	
	@PostMapping("user/{id}/games")
	public Game createNewGame(@PathVariable int id, @RequestBody Game game, HttpServletRequest req, HttpServletResponse res) {
		System.out.println("------------------------");
		System.out.println(id);
		Game createdGame= itsGame.createGame(id, game);
		if(createdGame==null) {
			res.setStatus(404);
		}else {
			res.setStatus(201);
			StringBuffer url= req.getRequestURL();
			url.append("/").append(createdGame.getId());
			res.setHeader("Location", url.toString());
		}
		return createdGame;
	}
	
	@PutMapping(path="user/{id}/games/{gid}")
	public Game update(@PathVariable int id, @PathVariable int gid, @RequestBody Game game, HttpServletResponse res) {
		try {
			game=itsGame.updateGame(id, gid, game);
			if(game==null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			game=null;
		}
		return game;
	}
	
	@DeleteMapping("user/{id}/games/{cid}")
	public void deleteComment(@PathVariable int id, @PathVariable int cid, HttpServletResponse res) {
		boolean deleted= itsGame.deleteGame(id, cid);
		if(deleted) {
			res.setStatus(204);
		}else {
			res.setStatus(404);
		}
	}
	
	@GetMapping("user/{id}/games")
	public List<Game> findGamesByUser(@PathVariable int id){
		return itsGame.findByUserId(id);
	}
	
	@GetMapping("games/{id}")
	public Game findGamesById(@PathVariable int id){
		return itsGame.findById(id);
	}
	
	@GetMapping("games/category/{keyword}")
	public List<Game> findByCategoryKeyword(@PathVariable String keyword){
		return itsGame.findByCategory(keyword);
	}
	
	@GetMapping("games/title/{keyword}")
	public List<Game> findByTitleKeyword(@PathVariable String keyword){
		return itsGame.findByTitle(keyword);
	}
}
