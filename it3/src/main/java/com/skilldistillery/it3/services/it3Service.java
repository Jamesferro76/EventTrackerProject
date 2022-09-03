package com.skilldistillery.it3.services;

import com.skilldistillery.it3.entities.Rule;

public interface it3Service {
	
	Rule createRule(int id, Rule rule);

	boolean deleteRule(int gameId, int ruleId);

	Rule updateRule(int id, int rid, Rule rule);

}
