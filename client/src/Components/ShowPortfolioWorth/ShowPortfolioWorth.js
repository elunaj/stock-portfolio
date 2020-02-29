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
  			transformArr: [],
  			finalArr: []
		}

	}

	componentDidMount() {
		this.getCurrentPrice(this.props.userPortfolioCollection);
	}

	componentDidUpdate() {

		if(this.state.userStockPriceCall && !this.state.newArrUpdate) {
			this.combineArrays(this.props.userPortfolioCollection,this.state.transformArr);
		}
	}

	getCurrentPrice = (array) => {

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
			});
		});

		Promise.all(promises).then(results => {
			results.map(item => {
	
				let transformArr = Object.assign({}, item);

				this.setState(prevState => ({
					transformArr: [...prevState.transformArr, transformArr]
				}))
			})

				this.setState({
				userStockPriceCall: true
			})
		})	
	}

	combineArrays = (userPort, apiCallArr) => {

		// api to format stock price as USD currency value
		const formatter = new Intl.NumberFormat('en-US', {
		  style: 'currency',
		  currency: 'USD',
		  minimumFractionDigits: 2
		});

		let combinedArr = [];


		for (let i = 0; i < userPort.length; i++) {
			combinedArr.push(Object.assign({}, userPort[i], { stockWorth: formatter.format(Number(apiCallArr[i].latestPrice) * Number(userPort[i].sum))}, { openVsCurrent: Number(apiCallArr[i].latestPrice) - Number(apiCallArr[i].open)}));
		}
	
		this.setState({
			finalArr: [...combinedArr],
			newArrUpdate: true
		})

	}


	render() {

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

