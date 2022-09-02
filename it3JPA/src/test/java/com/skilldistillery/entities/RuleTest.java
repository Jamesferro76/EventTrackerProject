package com.skilldistillery.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.skilldistillery.it3.entities.Rule;

class RuleTest {

	private static EntityManagerFactory emf;
	
	private EntityManager em;
	private Rule rule;
	
	
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
		rule=em.find(Rule.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		rule= null;
	}

	@Test
	void test_Rule_Entity_mapping() {
		assertNotNull(rule);
		assertEquals("You do the dishes", rule.getCondition());
	}
	
	@Test
	void test_Rule_And_Game_Entity_mapping() {
		assertNotNull(rule);
		assertEquals(1, rule.getGame().getId());
	}

}
