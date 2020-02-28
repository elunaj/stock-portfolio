import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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
							            Buy{' '}({transaction.symbol}) - {' '}{transaction.shares}{' @ '}{' '}{Number(transaction.stock_price)}
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


