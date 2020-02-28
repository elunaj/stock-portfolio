const handlePortfolioGet = (req, res, db) => {

	db.select('symbol')
		.sum('shares')
		.from('transactions')
		.where('user_id', '=', req.params.id)
		.groupBy('symbol')
		.then(portfolio => {
			if (portfolio) {
				console.log(portfolio);
				res.json(portfolio);
			} else {
				res.status(400).json('Not found');
			}
		})
		.catch(err => res.status(400).json('Error getting portfolio'));

}

module.exports = {
	handlePortfolioGet: handlePortfolioGet
}