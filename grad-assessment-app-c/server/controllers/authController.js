module.exports = {
	verifyUser(req, res) {
		const { user, pass } = req.body;
		if (user === 'codesmith' && pass === 'ilovetesting') {
			res.cookie('token', 'admin').redirect('/secret');
		}
		res.status(400).send('unsuccessful login attempt');
	},

	verifyCookie(req, res, next) {
		console.log(req.cookies);
		const { token } = req.cookies;
		if (token === 'admin') {
			next();
		} else {
			res.status(200).send('You must be signed in to view this page');
		}
	},
};
