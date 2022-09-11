package com.skilldistillery.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.skilldistillery.it3.entities.Game;

class GameTest {

	private static EntityManagerFactory emf;
	
	private EntityManager em;
	private Game game;
	
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf=Persistence.createEntityManagerFactory("it3JPA");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em=emf.createEntityManager();
		game=em.find(Game.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		game= null;
	}

	@Test
	void test_Game_Entity_mapping() {
		assertNotNull(game);
		assertEquals("Chores", game.getTitle());
	}
	
	@Test
	void test_Game_And_Rules_Entity_mapping() {
		assertNotNull(game);
		assertTrue(game.getRules().size()>0);
	}
	@Test
	void test_Game_And_User_Entity_mapping() {
		assertNotNull(game);
		assertEquals(1, game.getUser().getId());
		assertEquals("James", game.getUser().getFirstName());
	}
	@Test
	void test_Game_And_Cateogry_Entity_mapping() {
		assertNotNull(game);
		assertTrue(game.getCategories().size()>0);
	}
	

}
