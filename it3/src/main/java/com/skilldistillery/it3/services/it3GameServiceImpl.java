package com.skilldistillery.it3.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.it3.entities.Category;
import com.skilldistillery.it3.entities.Game;
import com.skilldistillery.it3.entities.Rule;
import com.skilldistillery.it3.entities.User;
import com.skilldistillery.it3.repositories.it3CategoryRepository;
import com.skilldistillery.it3.repositories.it3GameRepository;
import com.skilldistillery.it3.repositories.it3RuleRepository;
import com.skilldistillery.it3.repositories.it3UserRepository;

@Service
public class it3GameServiceImpl implements it3GameService {

	@Autowired
	private it3GameRepository repoGame;
	@Autowired
	private it3RuleRepository repoRule;
	@Autowired
	private it3UserRepository repoUser;
	@Autowired
	private it3CategoryRepository repoCat;
	
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
		Category cat=repoCat.findByCategoryIgnoreCaseContaining(keyword);
		return repoGame.findByCategoriesContaining(cat);
	}

	@Override
	public Game createGame(int id, Game game) {
		Optional<User> userOpt = repoUser.findById(id);
		if (userOpt.isPresent()) {
			User user = userOpt.get();
			repoUser.saveAndFlush(user);
			game.setUser(user);
			game=addCategoriesToGame(game);
			repoGame.saveAndFlush(game);
			return game;
		}
		return null;
	}
	
	public Game addCategoriesToGame(Game game) {
		String titleCat= game.getTitle().replaceAll("\\s", "");
		Category cat= repoCat.findByCategory(titleCat);
		if(cat==null || cat.getCategory().equals("")) {
			cat= new Category(titleCat);
		}
		List<Category> categories= game.getCategories();
		if(categories==null) {
			categories= new ArrayList<Category>();
		}
		categories.add(cat);
		repoCat.saveAndFlush(cat);
		game.setCategories(categories);
		return game;
	}

	@Override
	public boolean deleteGame(int userId, int gameId) {
		boolean deleted = false;
		Game gameToDelete = repoGame.findByIdAndUserId(gameId, userId);
		System.out.println("-------------------------------");
		System.out.println(gameToDelete);
		if (gameToDelete != null) {
			List<Rule> rulesToDelete= repoRule.findByGameId(gameId);
			for (Rule rule : rulesToDelete) {
				repoRule.delete(rule);
			}
			repoGame.delete(gameToDelete);
			deleted = true;
		}
		return deleted;
	}

	@Override
	public Game updateGame(int id, int gid, Game game) {
		
		Optional<User> userOpt = repoUser.findById(id);
		if (userOpt.isPresent()) {
			User user = userOpt.get();
			game.setUser(user);
			game.setId(gid);
			game=addCategoriesToGame(game);
			repoGame.saveAndFlush(game);
			return game;
		}
		return null;
	}
	
}
