package com.skilldistillery.it3.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.it3.entities.Game;
import com.skilldistillery.it3.entities.Rule;
import com.skilldistillery.it3.repositories.it3GameRepository;
import com.skilldistillery.it3.repositories.it3RuleRepository;

@Service
public class it3ServiceImpl implements it3Service {

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
	public Rule createRule(int id, Rule rule) {
		Optional<Game> gameOpt = repoGame.findById(id);
		if (gameOpt.isPresent()) {
			Game game = gameOpt.get();
			rule.setGame(game);
			repoRule.saveAndFlush(rule);
			return rule;
		}
		return null;
	}

	@Override
	public Rule updateRule(int id, int rid, Rule rule) {
		Optional<Game> gameOpt = repoGame.findById(id);
		if (gameOpt.isPresent()) {
			Game game = gameOpt.get();
			rule.setId(rid);
			Optional<Rule> ruleOpt = repoRule.findById(rid);
			if (ruleOpt.isPresent()) {
				rule.setGame(game);
				repoRule.saveAndFlush(rule);
				return rule;
			}
		}

		return null;
	}

	@Override
	public boolean deleteRule(int gameId, int ruleId) {
		boolean deleted = false;
		Rule ruleToDelete = repoRule.findByIdAndGameId(ruleId, gameId);
		if (ruleToDelete != null) {
			repoRule.delete(ruleToDelete);
			deleted = true;

		}
		return deleted;
	}

	@Override
	public List<Game> findByUserId(int id) {
		return repoGame.findByUserId(id);
	}
	
}
