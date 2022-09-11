window.addEventListener('load', function(){
	console.log('login.js loaded');
	init();
});


function init(){
	
var home= document.getElementById("home");
home.addEventListener('click', function(){
		location.href="index.html"
	});
	
document.loginUser.login.addEventListener('click', function(event) {
		event.preventDefault();
		console.log('logging in');
		let user = {
			username: document.loginUser.username.value,
			password: document.loginUser.password.value,
			
		};
		if (user.username.length > 0 && user.password.length > 0) {
			console.log(user);
			findUser(user);
		}
		
	});
	
	
}

function findUser(user){
	let xhr=new XMLHttpRequest();
	console.log(user)
	xhr.open("GET", "api/user/"+user.username+"/"+user.password);
	xhr.onreadystatechange=function(){
		if(xhr.readyState===4){
			if(xhr.status===200){
				console.log(xhr.responseText);
				displayUser(JSON.parse(xhr.responseText));
			}
			else{
				console.error("Error loading user: "+ xhr.status);
				let dataDiv=document.getElementById("loginDisplay");
			dataDiv.textContent= 'Login failed: Check username and password';
			}
		}
	};
	xhr.send();
}

function displayUser(user){
	let dataDiv=document.getElementById("loginDisplay");
	dataDiv.textContent= '';
	let name = document.createElement('h1');
	name.textContent = user.firstName+" "+user.lastName;
	dataDiv.appendChild(name);
	
};

