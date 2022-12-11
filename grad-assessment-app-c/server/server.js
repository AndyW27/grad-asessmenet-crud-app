const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get('/', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', authController.verifyCookie, (req, res) => {
	res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, '../assets')));

// ROUTES HANDLERS
app.post('/api', taskController.postTask);
app.get('/api', taskController.getTasks);
app.delete('/api/:id', taskController.deleteTask);
app.post('/signin', authController.verifyUser);

// PAGE NOT FOUND
app.use((req, res) => {
	res.status(404).send('Page not found');
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
	res.status(500).json(err);
});

// CONNECT TO DB
mongoose
	.connect(
		'mongodb+srv://andywong:codesmith54@cluster0.ujnij3o.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log('DB connection successful');
	});

// START SERVER
app.listen(3333, () => {
	console.log('Server listening on port 3333');
});
