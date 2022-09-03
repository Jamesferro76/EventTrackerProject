package com.skilldistillery.it3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.it3.entities.User;

public interface it3UserRepository extends JpaRepository<User, Integer> {


}
