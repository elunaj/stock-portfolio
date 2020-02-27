import React from 'react';
import PurchaseStock from '../PurchaseStock/PurchaseStock';
import { Typography, Card, CardContent } from '@material-ui/core';

export default class Portfolio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	// calculates stock price * quantity in 
	// purchaseStock child component 
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

			
		return (
			<div>

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


