const handleRegister = (req, res, db, bcrypt) => {
	
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}

	const saltRounds = 10;

	bcrypt.hash(password, saltRounds, (err, hash) => {
  		// Store hash in your password DB.
  		console.log(hash);

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