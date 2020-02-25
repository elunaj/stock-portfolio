const handleTransactionAdd = (req, res, db) => {

	const { id, stockSymbol, userQuantity, 
		stockPrice, totalCost, userAccountBalance } = req.body;

	db.transaction(trx => {
			trx('users')
			.where('id', id)
			.update("cash", userAccountBalance - totalCost)
			.returning('*')
			.then(trans => {
				return trx('transactions')
					.returning('*')
					.insert({
						user_id: id,
						symbol: stockSymbol,
						shares: userQuantity,
						stock_price: stockPrice 
					})
				.then(user => {
					res.json(user[0])
				})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})

		.catch(err => res.status(400).json('Unable to post transaction'));
}

const handleTransactionsGet = (req, res, db) => {

	db.select('*').from('transactions')
		.where('user_id', '=', req.params.id)
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
	handleTransactionsGet: handleTransactionsGet,
	handleTransactionAdd: handleTransactionAdd
}
