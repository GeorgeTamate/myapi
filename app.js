var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Users JSON Array
var users = [];

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// HELLO WORLD!
app.get('/', function (req, res) {
	res.send('Hello World!');
});

// Get Users JSON Array
app.get('/users', function (req, res) {
	res.type('application/json');
	res.send(users);
});

// LOGIN
app.post(['/','/login'], function (req, res) {
	console.log('Login Request Arrived:');
	console.log(req.body);
	console.log();

	var found;
	var exists = false;
	var authenticated = false;
	var user;
	var index = 0;

	for (index = 0; index < users.length; ++index) {
   		user = users[index];
    	if (user.username == req.body.username) {
        	found = user;
        	exists = true;
        	if (user.password == req.body.password) {
        		authenticated = true;
        	}
        	break;
    	}
	}

	var json;

	if (authenticated) {
		json = {
			"username": found.username,
			"password": found.password,
			"success": authenticated,
			"message": 'SUCCESS! Logging In.'
		};
	} else if (exists) {
		json = {
			"username": found.username,
			"password": null,
			"success": authenticated,
			"message": 'Invalid Password.'
		};
	} else {
		json = {
			"username": null,
			"password": null,
			"success": authenticated,
			"message": 'User does not exist.'
		};
	}

	res.type('application/json');
	res.send(json);
});

// REGISTER
app.post(['/register','/create'], function (req, res) {
	console.log('Register Request Arrived:');
	console.log(req.body);
	console.log();

	var exists = false;
	var user;
	var index = 0;

	for (index = 0; index < users.length; ++index) {
   		user = users[index];
    	if (user.username == req.body.username) {
        	exists = true;
        	break;
    	}
	}

	var json;
	
	if (exists) {
		json = {
			"success": false,
			"message": 'Username already exists.'
		};
	} else {
		json = {
			"success": true,
			"message": 'SUCCESS! User Created.'
		};

		users.push(req.body);
	}

	res.type('application/json');
	res.send(json);
});

// POST SESSION
app.post('/session', function (req, res) {
	console.log('Session Results Arrived:');
	console.log(req.body);
	console.log();

	var json;

	json = {
		"success": true,
		"message": 'SUCCESS! Results sent to API.'
	};

	res.type('application/json');
	res.send(json);
});

// LISTEN
app.listen(8086, function () {
 	console.log('Example app listening on port 8086!');
});