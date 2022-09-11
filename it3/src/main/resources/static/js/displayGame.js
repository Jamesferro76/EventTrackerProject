window.addEventListener('load', function(){
	console.log('displayGame.js loaded');
	init();
});

function init(){
	
	var data = localStorage.getItem("object_name");
//localStorage.clear();
var game = JSON.parse(data);
gamePage(game);

document.createRule.create.addEventListener('click', function(event) {
		event.preventDefault();
		console.log('Adding rule');
		let createdRule = {
			condition: document.createRule.condition.value,
			reward: document.createRule.reward.value,
			inUse: true,
			active: true,
			game: game,
		};
		if (createdRule.condition.length > 0 && createdRule.reward.length > 0) {
			console.log(createdRule);
			document.createRule.condition.value='';
			document.createRule.reward.value='';
			console.log("In init about to create rule "+createdRule.game.title);
			postRule(createdRule);
		}
	
});

var home= document.getElementById("home");
home.addEventListener('click', function(){
		location.href="index.html"
	})

}

function gamePage(game){
	
	let dataDiv=document.getElementById("gamePage");
	dataDiv.textContent= '';
	let title = document.createElement('h1');
	title.textContent = game.title;
	dataDiv.appendChild(title);

	let description = document.createElement('blockquote');
	description.textContent = game.description;
	dataDiv.appendChild(description);
	rulesByGameId(game.id, game);
	}
	
function displayRules(rules, game){
	let dataDiv=document.getElementById("displayRules");
	dataDiv.textContent= '';
	
	for(let rule of rules){
		let condition= document.createElement('h4');
		condition.textContent=rule.condition;
		dataDiv.appendChild(condition);
		let reward= document.createElement('blockquote');
		reward.textContent=rule.reward;
		dataDiv.appendChild(reward);
		
		condition.addEventListener('click', function(){
		updateSetUp(rule, game);
		
})
	}
}

function rulesByGameId(id, game){
	let xhr=new XMLHttpRequest();
	console.log(id)
	xhr.open("GET", "api/games/"+id+"/rules");
	xhr.onreadystatechange=function(){
		if(xhr.readyState===4){
			if(xhr.status===200){
				console.log(xhr.responseText);
				displayRules(JSON.parse(xhr.responseText), game);
			}
			else{
				console.error("Error loading games: "+ xhr.status);
			}
		}
	};
	xhr.send();
}

function gameByGameId(id){
	removeUpdateForm();
	let xhr=new XMLHttpRequest();
	console.log(id)
	xhr.open("GET", "api/games/"+id);
	xhr.onreadystatechange=function(){
		if(xhr.readyState===4){
			if(xhr.status===200){
				console.log(xhr.responseText);
				gamePage(JSON.parse(xhr.responseText));
			}
			else{
				console.error("Error loading games: "+ xhr.status);
			}
		}
	};
	xhr.send();
}

function postRule(createdRule) {
	let xhr = new XMLHttpRequest();

	console.log("in postRule" + createdRule.game.id);
	xhr.open('POST', 'api/games/'+createdRule.game.id+'/rules');

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 ||xhr.status===201) {

				console.log('rule created')
				let data = xhr.responseText;
				console.log(data);
				let rule = JSON.parse(data);
				console.log("In postRule: rule created "+ createdRule.game.id);
				gameByGameId(createdRule.game.id);

			} else if(xhr.status===400){
				displayError('Invalid data');
			}
			else {
				console.error('Something went wrong: ' + xhr.status);
				displayError('Rule creation failed')
			}
		}
	};

	let createdRuleJson = JSON.stringify(createdRule);
	console.log(createdRuleJson);
	xhr.send(createdRuleJson);
};


//UpdateRule----------------------------------------------------------------------------UpdateRule--------------------------------------

updateSetUp= function(rule, game){
	let dataDiv=document.getElementById("update");
	dataDiv.textContent= '';
	let form= document.createElement('form');
	dataDiv.appendChild(form);
	
	let hidden=document.createElement('input');
	hidden.type="hidden";
	hidden.value=rule.id;
	hidden.name='ruleId';
	form.appendChild(hidden);
	
	let condition= document.createElement('input');
	condition.type="text";
	condition.name="condition";
	condition.value=rule.condition;
	form.appendChild(condition);

	form.appendChild(document.createElement('br'));
	
	let reward= document.createElement('textarea');
	reward.row=3;
	reward.cols=40;
	reward.name="description";
	reward.value=rule.reward;
	form.appendChild(reward);
	
	
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
		console.log('Updating rule');
		let updatedRule = {
			id: hidden.value,
			condition: condition.value,
			reward: reward.value,
			inUse: true,
			active: true,
			game: game,
		};
		if (updatedRule.condition.length > 0 && updatedRule.reward.length > 0) {
			console.log(updatedRule);
			updateRule(updatedRule);
		}
		
	});
	
	del.addEventListener('click', function(event){
		event.preventDefault();
		deleteGame(rule, game);
		});
}

function updateRule(updatedRule) {
	let xhr = new XMLHttpRequest();

	console.log("in updatedRule" + updatedRule.id);
	console.log("in updatedRule" + updatedRule.game.id);
	xhr.open('PUT', 'api/games/'+updatedRule.game.id+"/rules/"+updatedRule.id);

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 ||xhr.status===201) {

				console.log('rule updated')
				let data = xhr.responseText;
				console.log(data);
				let rule = JSON.parse(data);
				gameByGameId(updatedRule.game.id);

			} else if(xhr.status===400){
				displayError('Invalid data');
			}
			else {
				console.error('Something went wrong: ' + xhr.status);
				displayError('Rule update failed')
			}
		}
	};

	let updatedRuleJson = JSON.stringify(updatedRule);
	console.log(updatedRuleJson);
	xhr.send(updatedRuleJson);
};


function deleteGame(deleteRule, game) {
	let xhr = new XMLHttpRequest();

	console.log("in delete" + deleteRule.id)
	xhr.open('DELETE', 'api/games/'+game.id+'/rules/'+deleteRule.id);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 ||xhr.status===204) {

				console.log('game deleted')
				gameByGameId(game.id);

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

function removeUpdateForm(){
	let dataDiv=document.getElementById("update");
	dataDiv.textContent= '';
	while(dataDiv.lastElementChild){
	dataDiv.removeChild(dataDiv.firstElementChild);
	}
}
