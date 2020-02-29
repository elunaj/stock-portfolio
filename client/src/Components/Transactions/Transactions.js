import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Spinner from '../Spinner/Spinner';
import Typography from '@material-ui/core/Typography';
import './Transactions.css';

export default class Transactions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            
		}
	}

	componentDidMount() {
		// makes call to pull user's transaction history
		this.props.findUserTransactions();
	}

	render() { 

			// currency formatter
			const formatter = new Intl.NumberFormat('en-US', {
			  style: 'currency',
			  currency: 'USD',
			});

		return (
			<div>
				{this.props.transactionGetStatus 

				?	(this.props.userTransCollection.map( (transaction, i) => {
				 	
					 	return (
				 				<Card className="trans" key={i}>
							   
							        <CardContent style={{
							        	'color': '#00008B',
							        	'backgroundColor': '#F0F0F0',
							        	'fontWeight': '500',
							        	'textDecoration': 'underline'
							        }}>
							          <Typography gutterBottom variant="h6" component="h2">
							            Buy{' '}({transaction.symbol}) - {' '}{transaction.shares}{' @ '}{' '}{formatter.format(transaction.stock_price)}
							          </Typography>							        
							        </CardContent>
							    </Card> : null
				 			);
				 		})
				 	) 

			 	: <Spinner/> }
			 	
			</div>
		);
	}
}


