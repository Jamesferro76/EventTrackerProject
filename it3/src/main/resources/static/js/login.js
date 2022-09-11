window.addEventListener('load', function(){
	console.log('login.js loaded');
	init();
});


function init(){
	
var home= document.getElementById("home");
home.addEventListener('click', function(){
		location.href="index.html"
	});
	
	var data = localStorage.getItem("userLoggedIn");
		var profile=JSON.parse(data);
		
	if(profile!=null){
		console.log(profile);
		displayUser(profile);
	}else{
	
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
	
document.registerUser.register.addEventListener('click', function(event) {
		event.preventDefault();
		console.log('register');
		let user = {
			firstName: document.registerUser.firstName.value,
			lastName: document.registerUser.lastName.value,
			username: document.registerUser.username.value,
			password: document.registerUser.password.value,
			email: document.registerUser.email.value,
			
		};
		if (user.firstName.length>0 && user.lastName.length>0 && user.username.length > 0 && user.password.length > 0 &&user.email.length>0) {
			console.log(user);
			createUser(user);
		}
		
	});
	}
	
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
	
	let banner=document.getElementById("banner");
	banner.textContent="profile";
	localStorage.setItem("userLoggedIn",JSON.stringify(user));
	removeLoginForm();
	removeRegisterForm();
	createLogout(user);
	
};

function removeLoginForm(){
	let dataDiv=document.getElementById("loginForm");
	dataDiv.textContent= '';
	while(dataDiv.lastElementChild){
	dataDiv.removeChild(dataDiv.firstElementChild);
	}
}

function removeRegisterForm(){
	let dataDiv=document.getElementById("registerForm");
	dataDiv.textContent= '';
	while(dataDiv.lastElementChild){
	dataDiv.removeChild(dataDiv.firstElementChild);
	}
}


function createUser(createdUser) {
	let xhr = new XMLHttpRequest();

	console.log("in createUser" + createdUser)
	xhr.open('POST', 'api/user');

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 ||xhr.status===201) {

				console.log('game found')
				let data = xhr.responseText;
				console.log(data);
				let user = JSON.parse(data);
				displayUser(user);

			} else if(xhr.status===400){
				displayError('Invalid data');
			}
			else {
				console.error('Something went wrong: ' + xhr.status);
				displayError('User registration failed')
			}
		}
	};

	let createdUserJson = JSON.stringify(createdUser);
	console.log(createdUserJson);
	xhr.send(createdUserJson);
};

function createLogout(user){
	let dataDiv=document.getElementById("logout");
	dataDiv.textContent= '';
	let form= document.createElement('form');
	dataDiv.appendChild(form);
	
	let logout= document.createElement('button');
	logout.name="logout";
	logout.textContent='Logout';
	form.appendChild(logout);
	
	let del= document.createElement('button');
	del.name="delete";
	del.textContent='Delete';
	form.appendChild(del);
	
	logout.addEventListener('click', function(event){
		event.preventDefault();
			localStorage.setItem("userLoggedIn",null);
		window.location.reload();

		});
		
	del.addEventListener('click', function(event){
		event.preventDefault();
		deleteUser(user);
		window.location.reload();
		});
};

function deleteUser(user) {
	let xhr = new XMLHttpRequest();

	console.log("in delete" + user.id)
	xhr.open('DELETE', 'api/user/'+user.id);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 ||xhr.status===204) {

				console.log('user deleted')
				
				localStorage.setItem("userLoggedIn",null);
			} else if(xhr.status===400){
				displayError('Invalid data');
			}
			else {
				console.error('Something went wrong: ' + xhr.status);
				displayError('User unable to be deleted')
				let dataDiv=document.getElementById("loginDisplay");
			dataDiv.textContent= 'User unable to be deleted';
			}
		}
	};
	xhr.send();
};

