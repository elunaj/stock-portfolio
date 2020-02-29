import React from 'react';
import ShowPortfolioWorth from '../ShowPortfolioWorth/ShowPortfolioWorth';
import './PortfolioView.css';

export default class Portfolio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
		this.props.findUserPortfolio();

	}

	render() {

		return (
			<div>
				{this.props.portfolioGetStatus

				?   <ShowPortfolioWorth
						userPortfolioCollection={[...this.props.userPortfolioCollection]}
						userId={this.props.userId}
					/>
					: null }
				
			 	
			</div>
		);
	}
} 
