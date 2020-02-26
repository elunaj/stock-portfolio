import React from 'react';
import PurchaseStock from '../PurchaseStock/PurchaseStock';
import { Typography, Card, CardContent } from '@material-ui/core';
import './Portfolio.css';

export default class Portfolio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totalCost: null,
			transactionGetStatus: this.props.transactionGetStatus
		}
	}

	componentDidMount() {
		this.props.findUserTransactions();
	}


	calculateStockPurchaseCost = (stockPrice, quantity) => {

		let quantityToNum = Number(quantity);

		if (isNaN(quantityToNum)) {
			return undefined;
		} else {
			this.setState({
				totalCost: quantityToNum * stockPrice
			})
			return this.state.totalCost;
		}
	}


	render() {

		console.log(this.props)
			
		return (
			<div>

				<div>
				{this.props.transactionGetStatus 

				?	(this.props.userTransCollection.map( (transaction, i) => {
				 			return (
				 				<Card className="port" key={i}>
							   
							        <CardContent style={{
							        	'color': '#00008B',
							        	'backgroundColor': '#F0F0F0',
							        	'fontWeight': '500',
							        	'textDecoration': 'underline'
							        }}>
							          <Typography gutterBottom variant="h6" component="h2">
							            Buy{' '}({transaction.symbol}) - {' '}{transaction.shares}{' @ '}{' '}{transaction.stock_price}
							          </Typography>							        
							        </CardContent>
							    </Card>
				 			);
				 		})
				 	)

			 	: null }
			 	
			</div>
				 <Typography 
                  style={{
                    'marginTop': '2.5rem',
                    'display': 'block'
                  }}
                  variant="h6">Account balance:{' $'}{this.props.userAccountBalance}
                </Typography>

				<PurchaseStock  
					userAccountBalance={this.props.userAccountBalance}
					userId={this.props.userId}
					handleUserInputChange={this.props.handleUserInputChange}
                    handleUserStockLookUp={this.props.handleUserStockLookUp}
                    handleUserPurchase={this.props.handleUserPurchase}
                    stockFound={this.props.stockFound}
                    stockPrice={this.props.stockPrice}
                    stockSymbol={this.props.stockSymbol}
                    calculateStockPurchaseCost={this.state.calculateStockPurchaseCost}
                    userQuantity={this.props.userQuantity}
                    handleUserQuantityChange={this.props.handleUserQuantityChange}
                    typeError={this.props.typeError}
	            />
			</div>
		);
	}
} 


