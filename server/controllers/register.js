const handleRegister = (req, res, db, bcrypt) => {
	
	const { name, email, password } = req.body;

	// if neither exists in req body, return 400
	if (!email || !password || !name) {
		return res.status(400).json('incorrect form submission');
	}

	const saltRounds = 10;

	// function to hash incoming password
	bcrypt.hash(password, saltRounds, (err, hash) => {

		// transaction to insert new user into
		// login table && users table. If either fails
		// entire query fails
	  	db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						name: name,
						email: loginEmail[0],
						joined: new Date()
					})
				.then(user => {
					res.json(user[0])
				})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		
	.catch(err => res.status(400).json('unable to register'));

	});
}

module.exports = {
	handleRegister: handleRegister
}