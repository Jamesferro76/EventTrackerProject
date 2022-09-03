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

import com.skilldistillery.it3.entities.Category;

class CategoryTest {

	private static EntityManagerFactory emf;
	
	private EntityManager em;
	private Category category;
	
	
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
		category=em.find(Category.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		category= null;
	}

	@Test
	void test_Category_Entity_mapping() {
		assertNotNull(category);
		assertEquals("household", category.getCategory());
	}
	
	@Test
	void test_Category_And_Games_Entity_mapping() {
		assertNotNull(category);
		assertTrue(category.getGames().size()>0);
	}
	
	

}
