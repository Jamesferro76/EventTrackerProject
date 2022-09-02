package com.skilldistillery.it3.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.it3.entities.Game;
import com.skilldistillery.it3.entities.Rule;

public interface it3RuleRepository extends JpaRepository<Rule, Integer> {

	List<Rule> findByGameId(int gameId);

}
