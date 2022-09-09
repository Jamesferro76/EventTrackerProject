window.addEventListener('load', function(){
	console.log('script.js loaded');
	init();
});

function init(){
	//TODO
	//- Event handlers for butttons and stuff
	loadAllGames();
	
	document.createGame.create.addEventListener('click', function(event) {
		event.preventDefault();
		console.log('Adding game');
		let createdgame = {
			title: document.createGame.title.value,
			description: document.createGame.description.value,
			active: true,
			posted: true,
			
		};
		if (createdgame.title.length > 0 && createdgame.description.length > 0) {
			console.log(createdgame);
			postGame(createdgame);
		}
		
	});
	
	
	

}

function loadAllGames(){
	let xhr=new XMLHttpRequest();
	xhr.open("GET", "api/games");
	xhr.onreadystatechange=function(){
		if(xhr.readyState===4){
			if(xhr.status===200){
				console.log(xhr.responseText);
				displayGames(JSON.parse(xhr.responseText));
			}
			else{
				console.error("Error loading games: "+ xhr.status);
			}
		}
	};
	xhr.send();
}

function displayGames(gameList){
	let dataDiv=document.getElementById("gameList");
	dataDiv.textContent= '';
	let ul= document.createElement('ul');
	dataDiv.appendChild(ul);
	for(let game of gameList){
		let li= document.createElement('li');
		li.textContent=game.title;
		ul.appendChild(li);
		
		li.addEventListener('click', function(){
		updateSetUp(game);
		console.log('Update game '+game.id);
		
})
	}
};

function displayGame(game){
	let dataDiv=document.getElementById("edit");
	dataDiv.textContent= '';
	let title = document.createElement('h1');
	title.textContent = game.title;
	dataDiv.appendChild(title);

	let description = document.createElement('blockquote');
	description.textContent = game.description;
	dataDiv.appendChild(description);
	
};

//CREATEGAME------------------------------------------------------------------------CREATEGAME-------------------------------

function postGame(createdGame) {
	let xhr = new XMLHttpRequest();

	console.log("in postGame" + createdGame)
	xhr.open('POST', 'api/user/1/games');

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 ||xhr.status===201) {

				console.log('game found')
				let data = xhr.responseText;
				console.log(data);
				let game = JSON.parse(data);
				displayGame(game);
				loadAllGames();

			} else if(xhr.status===400){
				displayError('Invalid data');
			}
			else {
				console.error('Something went wrong: ' + xhr.status);
				displayError('Game creation failed')
			}
		}
	};

	let createdGameJson = JSON.stringify(createdGame);
	console.log(createdGameJson);
	xhr.send(createdGameJson);
};

//UPDATE------------------------------------------------------------------------UPDATE-------------------------------

updateSetUp= function(game){
	displayGame(game);
	
	let dataDiv=document.getElementById("update");
	dataDiv.textContent= '';
	let form= document.createElement('form');
	dataDiv.appendChild(form);
	
	let hidden=document.createElement('input');
	hidden.type="hidden";
	hidden.value=game.id;
	hidden.name='gameId';
	form.appendChild(hidden);
	
	let title= document.createElement('input');
	title.type="text";
	title.name="title";
	title.value=game.title;
	form.appendChild(title);

	form.appendChild(document.createElement('br'));
	
	let description= document.createElement('textarea');
	description.row=3;
	description.cols=40;
	description.name="description";
	description.value=game.description;
	form.appendChild(description);
	
	
	let update= document.createElement('button');
	update.name="update";
	update.textContent='Update';
	form.appendChild(update);
	
	let del= document.createElement('button');
	del.name="delete";
	del.textContent='Delete';
	form.appendChild(del);
	
	update.addEventListener('click', function(event){
		event.preventDefault();
		console.log('Updating game');
		let updatedgame = {
			id: hidden.value,
			title: title.value,
			description: description.value,
			active: true,
			posted: true,
			
		};
		if (updatedgame.title.length > 0 && updatedgame.description.length > 0) {
			console.log(updatedgame);
			updatedGame(updatedgame);
		}
		
	});
	
	del.addEventListener('click', function(event){
		event.preventDefault();
		deleteGame(game.id);
		
		});
}


function updatedGame(updatedGame) {
	let xhr = new XMLHttpRequest();

	console.log("in updatedGame" + updatedGame)
	xhr.open('PUT', 'api/user/1/games/'+updatedGame.id);

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 ||xhr.status===201) {

				console.log('game updated')
				let data = xhr.responseText;
				console.log(data);
				let game = JSON.parse(data);
				displayGame(game);
				loadAllGames();

			} else if(xhr.status===400){
				displayError('Invalid data');
			}
			else {
				console.error('Something went wrong: ' + xhr.status);
				displayError('Game update failed')
			}
		}
	};

	let updatedGameJson = JSON.stringify(updatedGame);
	console.log(updatedGameJson);
	xhr.send(updatedGameJson);
};


function deleteGame(gameId) {
	let xhr = new XMLHttpRequest();

	console.log("in delete" + gameId)
	xhr.open('DELETE', 'api/user/1/games/'+gameId);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 ||xhr.status===204) {

				console.log('game deleted')
				loadAllGames();

			} else if(xhr.status===400){
				displayError('Invalid data');
			}
			else {
				console.error('Something went wrong: ' + xhr.status);
				displayError('Game unable to be deleted')
			}
		}
	};
	xhr.send();
};

