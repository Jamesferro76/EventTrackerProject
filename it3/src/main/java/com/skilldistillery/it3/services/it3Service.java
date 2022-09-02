package com.skilldistillery.it3.services;

import java.util.List;

import com.skilldistillery.it3.entities.Game;
import com.skilldistillery.it3.entities.Rule;

public interface it3Service {
	
	List<Game> index();
	
	List<Rule> findByGameId(int gameId);
	
	Rule createRule(int id, Rule rule);

}
