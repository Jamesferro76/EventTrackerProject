window.addEventListener('load', function(){
	console.log('displayGame.js loaded');
	init();
});

function init(){
	
	var data = localStorage.getItem("object_name");
localStorage.clear(); //clean the localstorage
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
			console.log("In init about to create rule "+createdRule.game.title);
			postRule(createdRule);
		}
	
});

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
	rulesByGameId(game.id);
	}
	
function displayRules(rules){
	let dataDiv=document.getElementById("displayRules");
	dataDiv.textContent= '';
	let ul= document.createElement('ul');
	dataDiv.appendChild(ul);
	for(let rule of rules){
		let li= document.createElement('li');
		li.textContent=rule.condition;
		ul.appendChild(li);
		let li2= document.createElement('li');
		li2.textContent=rule.reward;
		ul.appendChild(li2);
		
		//li.addEventListener('click', function(){
		//updateSetUp(game);
		//console.log('Update game '+game.id);
		
//})
	}
}

function rulesByGameId(id){
	let xhr=new XMLHttpRequest();
	console.log(id)
	xhr.open("GET", "api/games/"+id+"/rules");
	xhr.onreadystatechange=function(){
		if(xhr.readyState===4){
			if(xhr.status===200){
				console.log(xhr.responseText);
				displayRules(JSON.parse(xhr.responseText));
			}
			else{
				console.error("Error loading games: "+ xhr.status);
			}
		}
	};
	xhr.send();
}

function gameByGameId(id){
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
