package com.skilldistillery.it3.services;

import java.util.List;

import com.skilldistillery.it3.entities.Game;
import com.skilldistillery.it3.entities.Rule;

public interface it3GameService {
	
	List<Game> index();
	
	List<Rule> findByGameId(int gameId);
	
	List<Game> findByUserId(int id);
	
	List<Game> findByCategory(String keyword);

	Game createGame(int id, Game game);

	boolean deleteGame(int id, int cid);

	Game updateGame(int id, int gid, Game game);

	Game findById(int id);

	List<Game> findByTitle(String keyword);

}
