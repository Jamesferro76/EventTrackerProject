package com.skilldistillery.it3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.it3.entities.Game;

public interface it3GameRepository extends JpaRepository<Game, Integer> {


}
