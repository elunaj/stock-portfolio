import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';
import DisplayTotalWorth from '../DisplayTotalWorth/DisplayTotalWorth';
import Spinner from '../Spinner/Spinner';


export default class ShowPortfolioWorth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userStockPriceCall: false,
			newArrUpdate: false,
  			apiCallArr: [],
  			finalArr: []
		}

	}

	componentDidMount() {
		this.getCurrentPrice(this.props.userPortfolioCollection);
	}

	componentDidUpdate() {

		if(this.state.userStockPriceCall && !this.state.newArrUpdate) {
			this.combineArrays(this.props.userPortfolioCollection, this.state.apiCallArr);
		}
	}

	// method that makes an api call for each stock in a user's portfolio.
	// Helps us find current price data and open vs close price.
	// Later on we use the data from this call to merge with user's
	// portfolio array to dynamically render user's stock worth, etc
	getCurrentPrice = (array) => {

		// creates an array of promises. One promise per stock in a user's portfolio
		const promises = array.map(item => {
			return fetch('http://localhost:5000/search/' + item.symbol, {
			    method: 'GET',
			    headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json'
			    }
			})
			.then(response => {
				return response.json();
			})
			.catch(err => console.log)
		});

		// when all promises are complete and resolved, returns 
		// result of promises in an array of the same order as original
		// promises. Now we 
		Promise.all(promises).then(results => {
			results.map(item => {
	
				const newArrayObject = Object.assign({}, item);

				this.setState(prevState => ({
					apiCallArr: [...prevState.apiCallArr, newArrayObject]
				}))
			})

				this.setState({
				userStockPriceCall: true
			})
		})
		.catch(err => console.log)
	}

	combineArrays = (userPort, apiCallArr) => {

		// format stock price as USD currency value
		const formatter = new Intl.NumberFormat('en-US', {
		  style: 'currency',
		  currency: 'USD',
		  minimumFractionDigits: 2
		});

		let combinedArr = [];

		// We're looping over each element in the userPort input 
		// (holds user's stock ticker symbol and sum of shares 
		// owned per stock). We then use Object.assign to
		// add the data in userPort and the data from the 
		// apiCallArr input (which holds current price
		// and opening/closing price from getCurrentPrice method)to a new object.
		// Basically, we're grouping information from two objects into one.
		// Lastly we push each new object to combinedArr/state which
		// becomes the arr we render 
		for (let i = 0; i < userPort.length; i++) {
			combinedArr.push(Object.assign({}, userPort[i], { stockWorth: formatter.format(Number(apiCallArr[i].latestPrice) * Number(userPort[i].sum))}, { openVsCurrent: Number(apiCallArr[i].latestPrice) - Number(apiCallArr[i].open)}));
		}
	
		this.setState({
			finalArr: [...combinedArr],
			newArrUpdate: true
		})

	}


	render() {

		{/* Each card is conditionally rendered based on
			whether the current price is >, <, === to the 
			opening price */}

		return (

			<div>
				<div>
					<DisplayTotalWorth 
						finalArr={this.state.finalArr}
						newArrUpdate={this.state.newArrUpdate}
					/>
				</div>

			<div>
				{this.state.userStockPriceCall && this.state.newArrUpdate

				? 	(this.state.finalArr.map( (stock, i) => {
				 			return (

				 				<Card className="port" key={i}>
							   		{stock.openVsCurrent > 0 

							   		? (  

							   		<CardContent style={{
							        	'color': 'green',
							        	'backgroundColor': '#F0F0F0',
							        	'fontWeight': '500',
							        	'textDecoration': 'underline'
							        }}>

								     	<Typography gutterBottom variant="h6" component="h2">
								            
								      		{(stock.symbol)}{' - '}{stock.sum}{' '}{stock.stockWorth}
								        </Typography>	
							        </CardContent> ) 

							        : stock.openVsCurrent === 0 

							        ? (

							        <CardContent style={{
							        	'color': 'gray',
							        	'backgroundColor': '#F0F0F0',
							        	'fontWeight': '500',
							        	'textDecoration': 'underline'
							        }}>

								        <Typography gutterBottom variant="h6" component="h2">
								            
								      		{(stock.symbol)}{' - '}{stock.sum}{' '}{stock.stockWorth}
								        </Typography>	
							        </CardContent> 

							        ) : stock.openVsCurrent < 0

							        ? (

							        <CardContent style={{
							        	'color': 'red',
							        	'backgroundColor': '#F0F0F0',
							        	'fontWeight': '500',
							        	'textDecoration': 'underline'
							        }}>

								        <Typography gutterBottom variant="h6" component="h2">
								            
								      		{(stock.symbol)}{' - '}{stock.sum}{' '}{stock.stockWorth}
								        </Typography>	
							        </CardContent>  : null

							        )

							        :  (<CardContent style={{
								        	'color': 'blue',
								        	'backgroundColor': '#F0F0F0',
								        	'fontWeight': '500',
								        	'textDecoration': 'underline'
								        }}>

									        <Typography gutterBottom variant="h6" component="h2">
									            
									      		{(stock.symbol)}{' - '}{stock.sum}{' '}{stock.stockWorth}
									        </Typography>	
								        </CardContent>)
							        }
							    </Card>
				 			);
				 		})
				 	)

			 	: <Spinner/> }
			
			 	
			</div>
		</div>

			);

	}
}

