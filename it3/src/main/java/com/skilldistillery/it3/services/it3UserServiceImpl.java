package com.skilldistillery.it3.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.it3.entities.Game;
import com.skilldistillery.it3.entities.Rule;
import com.skilldistillery.it3.entities.User;
import com.skilldistillery.it3.repositories.it3GameRepository;
import com.skilldistillery.it3.repositories.it3RuleRepository;
import com.skilldistillery.it3.repositories.it3UserRepository;

@Service
public class it3UserServiceImpl implements it3UserService {

	@Autowired
	private it3UserRepository repoUser;
	@Autowired
	private it3GameRepository repoGame;
	@Autowired
	private it3RuleRepository repoRule;

	@Override
	public List<User> findAll() {
		return repoUser.findAll();
	}
	
	@Override
	public User createUser(User user) {
			return repoUser.saveAndFlush(user);
		}

	@Override
	public boolean deleteUser(int userId) {
		boolean deleted = false;
		Optional<User> userOpt = repoUser.findById(userId);
		if(userOpt.isPresent()) {
			User userToDelete=userOpt.get();
			if (userToDelete != null) {
			List<Game> games= userToDelete.getGames();
			for (Game game : games) {
				List<Rule> rules=game.getRules();
				for (Rule rule : rules) {
					repoRule.delete(rule);
				}
				repoGame.delete(game);
			}
			repoUser.delete(userToDelete);
			deleted = true;

		}
		}
		return deleted;
	}

	@Override
	public User updateUser(int id, User user) {
				user.setId(id);
				repoUser.saveAndFlush(user);
				return user;
			}

}
