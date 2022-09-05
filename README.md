# EventTrackerProject
# Overview
The premise of this project is pretty simple. Create a full CRUD back end using Rest. I decided to work on a site which I call "If this, then that". This site is a pretty basic reward system that will be simple and easy to use. You start with an if statement, basically what do you want to accomplish: "If I go to the gym", "If you do your assignment", "If I make this basket" etc. Once you have that, you add your then clause. What is your reward: "Then I get to have dessert", "Then you get 5 minutes of free time", "then you owe me $5" etc. You can string as many if/thens into your ruleset as you want, I call this a "Game". Users are welcome to post their "Games" for others to see and use if they want.

# Technologies Used
* Postman
* MySql Workbench
* Spring Tool Suite
* Git
* Github
* Rest
* Spring Data JPA
* AWS-EC2
* Gradle
* Java
* Terminal -zsh

# Lessons Learned
During this project I was able to get more hands on experience with many different techniques:
* Database Management- I was responsible for planning and maintaining my database for this project. This has been the first time that I alone was responsible for creating and implementing a multi-table database.
* REST- This was a great hands on experience with using REST to complete CRUD functionality. This makes my code a bit more dry and saves plenty of time.
* Organization- During my last project my team and I made the mistake of not separating out controllers or DAO's effectively. I made sure this time stay organized and break everything into their own Controller/service classes.
* Planning- Before beginning this project I spent time planning out my database and fleshing out the functionality that I wanted from this website. This allowed me to really concentrate of what I wanted for an MVP and keep me honed in on my mission. My original plan had about 3 or 4 extra tables that I decided to cut for the time being. Planning ended up saving me many head aches down to road and allowed me to keep my ambitions in check.

# URL Paths for Postman

Due to this project being a backend only assignment I am posting here some information for you to check out if it works on Postman:

| HTTP Verb | URI                    | Request Body | Response Body             | Functionality                                                              |
|:---------:|:-----------------------|:------------:|:--------------------------|:---------------------------------------------------------------------------|
| GET       | '/api/games'           |              |  List of games            | Return a list of all games                                                 |
| GET       | '/api/user'            |              |  List of users            | Return a list of all users                                                 |
| GET       | '/api/games/1/rules'   |              |  List of rules by games   | Return a list of rules based on the game                                   |
| Get       | '/api/games/category/household'|      |  List of games by category| Return a list of games based on the category                               |
| Get       | '/api/games/user/1/games'|            |  List of games by user    | Return a list of games based on the users                                  |
| Post      | '/api/user'            | JSON         |  Created users            | Creates a user and populates it in the database                            |
| Post      | '/api/user/1/games'    | JSON         |  Created game             | Creates a game and populates it in the database and assigns it a user      |
| Post      | '/api/api/games/1/rules'| JSON        |  Created rule             | Creates a rule and populates it in the database and assigns it a game      |
| PUT       | '/api/user/1'          | JSON         |  Updated users            | Modifies an existing user                                                  |
| PUT       | '/api/user/1/games/1'  | JSON         |  Updated games            | Modifies an existing game                                                  |
| PUT       | '/api/games/1/rules/3' | JSON         |  Updated rules            | Modifies an existing rule                                                  |
| DEL       | '/api/user1'           |              |                           | Deletes a user and any games/rules they have made                          |
| DEL       | '/api/user/1/games/4'  |              |                           | Deletes a game and any rules that go with it                               |
| DEL       | '/api/games/1/rules/4' |              |                           | Deletes a rule                                                             |
