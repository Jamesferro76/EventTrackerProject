package com.skilldistillery.it3.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Rule {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="condition_if")
	private String condition;

	@Column(name="reward_then")
	private String reward;
	
	@Column(name="date_created")
	@CreationTimestamp
	private LocalDateTime createDate;
	
	@UpdateTimestamp
	@Column(name="update_date")
	private LocalDateTime dateUpdated;
	
	@Column(name="in_use")
	private boolean inUse;
	
	private boolean active;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="game_id")
	private Game game;

	//CONSTRUCTORS------------------CONSTRUCTORS------------------------CONSTRUCTORS-----------------

	
	public Rule() {
		super();
	}
	
	//Getters and Setters------------Getters and Setters----------------Getters and Setters-------------------------

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getReward() {
		return reward;
	}

	public void setReward(String reward) {
		this.reward = reward;
	}

	public LocalDateTime getCreateDate() {
		return createDate;
	}

	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
	}

	public LocalDateTime getDateUpdated() {
		return dateUpdated;
	}

	public void setDateUpdated(LocalDateTime dateUpdated) {
		this.dateUpdated = dateUpdated;
	}

	public boolean isInUse() {
		return inUse;
	}

	public void setInUse(boolean inUse) {
		this.inUse = inUse;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
	
	

	//Hash/Equals---------------Hash/Equals--------------------Hash/Equals-----------------

	
	public Game getGame() {
		return game;
	}

	public void setGame(Game game) {
		this.game = game;
	}

	@Override
	public int hashCode() {
		return Objects.hash(active, condition, createDate, dateUpdated, id, inUse, reward);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Rule other = (Rule) obj;
		return active == other.active && Objects.equals(condition, other.condition)
				&& Objects.equals(createDate, other.createDate) && Objects.equals(dateUpdated, other.dateUpdated)
				&& id == other.id && inUse == other.inUse && Objects.equals(reward, other.reward);
	}

	//toString------------------toString---------------------------toString-------------

	
	@Override
	public String toString() {
		return "rules [id=" + id + ", condition=" + condition + ", reward=" + reward + ", createDate=" + createDate
				+ ", dateUpdated=" + dateUpdated + ", inUse=" + inUse + ", active=" + active + "]";
	}
	
	
	
	
}
