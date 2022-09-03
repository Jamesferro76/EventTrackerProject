package com.skilldistillery.it3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.it3.entities.Category;

public interface it3CategoryRepository extends JpaRepository<Category, Integer> {

	Category findByCategory(String category);

	Category findByCategoryIgnoreCaseContaining(String keyword);
	
}
