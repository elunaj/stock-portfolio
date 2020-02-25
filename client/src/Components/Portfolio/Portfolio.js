import React from 'react';
import PurchaseStock from '../PurchaseStock/PurchaseStock';

export default class Portfolio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totalCost: null
		}
	}

	componentDidUpdate() {
		this.props.updateUserAccountInfo();
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
					Account balance{this.props.userAccountBalance}
				</div>
				<PurchaseStock  
					userId={this.props.userId}
					userAccountBalance={this.props.userAccountBalance} 
					handleUserInputChange={this.props.handleUserInputChange}
                    handleUserStockLookUp={this.props.handleUserStockLookUp}
                    handleUserPurchase={this.props.handleUserPurchase}
                    stockFound={this.props.stockFound}
                    stockPrice={this.props.stockPrice}
                    stockSymbol={this.props.stockSymbol}
                    calculateStockPurchaseCost={this.state.calculateStockPurchaseCost}
                    totalCost={this.state.totalCost}
                    userQuantity={this.props.userQuantity}
                    handleUserQuantityChange={this.props.handleUserQuantityChange}
                    typeError={this.props.typeError}

	                />
			</div>
		);
	}
} 


