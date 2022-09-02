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

import com.skilldistillery.it3.entities.User;

class UserTest {

	private static EntityManagerFactory emf;
	
	private EntityManager em;
	private User user;
	
	
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
		user=em.find(User.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		user= null;
	}

	@Test
	void test_User_Entity_mapping() {
		assertNotNull(user);
		assertEquals("James", user.getFirstName());
	}
	
	@Test
	void test_User_And_Games_Entity_mapping() {
		assertNotNull(user);
		assertTrue(user.getGames().size()>0);
	}
	
	

}
