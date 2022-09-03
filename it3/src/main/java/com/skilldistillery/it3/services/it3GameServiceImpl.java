package com.skilldistillery.it3.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.it3.entities.Game;
import com.skilldistillery.it3.entities.Rule;
import com.skilldistillery.it3.repositories.it3GameRepository;
import com.skilldistillery.it3.repositories.it3RuleRepository;

@Service
public class it3GameServiceImpl implements it3GameService {

	@Autowired
	private it3GameRepository repoGame;

	@Autowired
	private it3RuleRepository repoRule;
	
	@Override
	public List<Game> index() {
		return repoGame.findAll();
	}

	@Override
	public List<Rule> findByGameId(int gameId) {
		System.out.println(gameId);

		if (!repoGame.existsById(gameId)) {
			return null;
		}
		List<Rule> rules = repoRule.findByGameId(gameId);
		return rules;
	}
	
	@Override
	public List<Game> findByUserId(int id) {
		return repoGame.findByUserId(id);
	}

	@Override
	public List<Game> findByCategory(String keyword) {
		return repoGame.findByCategoryIgnoreCaseContaining(keyword);
	}
}
