import React from 'react';
import PurchaseStock from '../PurchaseStock/PurchaseStock';
import { Typography } from '@material-ui/core';

const PurchaseParent = (props) => {

	// calculates stock price * quantity in 
	// purchaseStock child component 
	const calculateStockPurchaseCost = (stockPrice, quantity) => {

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


		return (
			<div>

				 <Typography 
                  style={{
                    'marginTop': '2.5rem',
                    'display': 'block'
                  }}
                  variant="h6">Account balance:{' $'}{props.userAccountBalance}
                </Typography>

				<PurchaseStock  
					userAccountBalance={props.userAccountBalance}
					userId={props.userId}
					handleUserInputChange={props.handleUserInputChange}
                    handleUserStockLookUp={props.handleUserStockLookUp}
                    handleUserPurchase={props.handleUserPurchase}
                    stockFound={props.stockFound}
                    stockPrice={props.stockPrice}
                    stockSymbol={props.stockSymbol}
                    calculateStockPurchaseCost={calculateStockPurchaseCost}
                    userQuantity={props.userQuantity}
                    handleUserQuantityChange={props.handleUserQuantityChange}
                    typeError={props.typeError}
	            />
			</div>
		);
} 

export default PurchaseParent;


