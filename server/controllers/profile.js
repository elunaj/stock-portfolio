const handleProfileGet = (req, res, db) => {

	db.select('*').from('users')
		.where('id', '=', req.params.id)
	.then(user => {
		if (user.length) {
			console.log(user)
			res.json(user);
		} else {
			res.status(400).json('Not found')
		}
	})
	.catch(err => res.status(400).json('Error getting user'))
}

module.exports = {
	handleProfileGet: handleProfileGet
}