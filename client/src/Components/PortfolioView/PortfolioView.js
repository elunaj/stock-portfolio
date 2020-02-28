import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';
import './PortfolioView.css';

export default class Portfolio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			transactionGetStatus: this.props.transactionGetStatus,
		}
	}


	componentDidMount() {
		this.props.findUserPortfolio();
	}


	render() {

		console.log(this.props)
		console.log(this.state.userCollectionMap)


			
		return (
			<div>
				{this.props.portfolioGetStatus

				?	(this.props.userPortfolioCollection.map( (stock, i) => {
				 			return (
				 				<Card className="port" key={i}>
							   
							        <CardContent style={{
							        	'color': '#00008B',
							        	'backgroundColor': '#F0F0F0',
							        	'fontWeight': '500',
							        	'textDecoration': 'underline'
							        }}>
							          <Typography gutterBottom variant="h6" component="h2">
							            {stock.symbol}{' - '}{Number(stock.sum)}{' $5,000'}
							          </Typography>							        
							        </CardContent>
							    </Card>
				 			);
				 		})
				 	)

			 	: null }
			 	
			</div>
		);
	}
} 
