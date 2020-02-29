import React from 'react';
import { Typography } from '@material-ui/core';


export default class DisplayTotalWorth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			foundPortfolioTotalWorth: false,
			portfolioTotalWorth: ''
		}
	}

	componentDidUpdate() {

		if (this.props.newArrUpdate && !this.state.foundPortfolioTotalWorth) {
			this.findPortfolioWorth(this.props.finalArr);
		}
	}

	findPortfolioWorth = (array) => {

		const formatter = new Intl.NumberFormat('en-US', {
		  style: 'currency',
		  currency: 'USD',
		});

		const portfolioValue = array.reduce((acc, stock) => {

			let newStock = stock.stockWorth;
	
			// replace currency format to make addition
			// of stocks possible
			let firstStockReplace = newStock.replace(/,/g, '');
			let secondStockReplace = firstStockReplace.replace('$', '');

			// parse into float
			let addStock = parseFloat(secondStockReplace);

			return acc + addStock;
		}, 0);


		//re-format newly calculated portfolio value
		let convertedNum = formatter.format(portfolioValue);

		// update state with new value
		this.setState({
			portfolioTotalWorth: convertedNum,
			foundPortfolioTotalWorth: true
		})
	}

	render() {

		return (
			<div>
				{this.state.foundPortfolioTotalWorth

					?
						(<Typography
		                  style={{
		                    'marginTop': '2.5rem',
		                    'display': 'block'
		                  }}
		                  variant="h6">Worth:{this.state.portfolioTotalWorth}
	                </Typography>)

					: null}
			</div>
	);

	}
	
}
