package com.skilldistillery.it3.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.it3.entities.Game;

public interface it3GameRepository extends JpaRepository<Game, Integer> {


	List<Game> findByUserId(int id);
	List<Game> findByCategoryIgnoreCaseContaining(String keyword);
}
