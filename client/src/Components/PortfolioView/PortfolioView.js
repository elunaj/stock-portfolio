import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';
import './PortfolioView.css';

export default class Portfolio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			transactionGetStatus: this.props.transactionGetStatus,
			userCollectionLoaded: [...this.props.userTransCollection],
			userCollectionMap: [],
			userMapReady: false
		}
	}

	// groups stocks by symbol
	groupTest = (list, keyGetter) => {
		const map = new Map();
		list.forEach((item) => {
			const key = keyGetter(item);
			const collection = map.get(key);

			if(!collection) {
				map.set(key, [item]);
			} else {
				collection.push(item);
			}
		});

		this.setState({
			userCollectionMap: [...map],
			userMapReady: true
				})
		return map;
	}

	componentDidMount() {
		this.props.findUserTransactions();
	}

	componentDidUpdate() {
			if (this.state.userCollectionLoaded && !this.state.userMapReady) {
			const test = this.groupTest(this.props.userTransCollection, stock => stock.symbol);
			console.log(this.state.userCollectionMap)
		}
	}



	render() {

		console.log(this.props)
		console.log(this.state.userCollectionMap)
			
		return (
			<div>
				{this.state.userCollectionMap 

				?	(this.state.userCollectionMap.map( (stock, i) => {
				 			return (
				 				<Card className="port" key={i}>
							   
							        <CardContent style={{
							        	'color': '#00008B',
							        	'backgroundColor': '#F0F0F0',
							        	'fontWeight': '500',
							        	'textDecoration': 'underline'
							        }}>
							          <Typography gutterBottom variant="h6" component="h2">
							            ({stock[0]}) - {' '}{stock[1][0].shares}{' shares '}-{' $ '}
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
