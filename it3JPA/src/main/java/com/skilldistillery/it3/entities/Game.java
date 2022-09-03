package com.skilldistillery.it3.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Game {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String title;
	
	private String description;
	
	@Column(name="date_created")
	@CreationTimestamp
	private LocalDateTime createDate;
	
	@UpdateTimestamp
	@Column(name="update_date")
	private LocalDateTime dateUpdated;
	
	@JsonIgnore
	@ManyToMany(cascade= {CascadeType.ALL})
	@JoinTable(
	        name = "category_has_game", 
	        joinColumns = { @JoinColumn(name = "game_id") }, 
	        inverseJoinColumns = { @JoinColumn(name = "category_id")})
	private List<Category> categories;
	
	private boolean active;
	private boolean posted;
	
	@JsonIgnore
	@OneToMany(mappedBy="game")
	private List<Rule> rules;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	//CONSTRUCTORS------------------CONSTRUCTORS------------------------CONSTRUCTORS-----------------
	public Game() {
		super();
	}
	
	public Game(int id, String title) {
		super();
		this.id = id;
		this.title = title;
	}
	
	//Getters and Setters------------Getters and Setters----------------Getters and Setters-------------------------

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean isPosted() {
		return posted;
	}

	public void setPosted(boolean posted) {
		this.posted = posted;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public List<Rule> getRules() {
		return rules;
	}

	public void setRules(List<Rule> rules) {
		this.rules = rules;
	}

	//Hash/Equals---------------Hash/Equals--------------------Hash/Equals-----------------
	
	@Override
	public int hashCode() {
		return Objects.hash(active, categories, createDate, dateUpdated, description, id, posted, rules, title, user);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Game other = (Game) obj;
		return active == other.active && Objects.equals(categories, other.categories)
				&& Objects.equals(createDate, other.createDate) && Objects.equals(dateUpdated, other.dateUpdated)
				&& Objects.equals(description, other.description) && id == other.id && posted == other.posted
				&& Objects.equals(rules, other.rules) && Objects.equals(title, other.title)
				&& Objects.equals(user, other.user);
	}
	
	
	//toString------------------toString---------------------------toString-------------

	@Override
	public String toString() {
		return "Game [id=" + id + ", title=" + title + "]";
	}

	
	

}
