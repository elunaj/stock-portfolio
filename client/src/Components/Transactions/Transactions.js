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
            transactionGetStatus: this.props.transactionGetStatus
		}
	}

	componentDidMount() {
		this.props.findUserTransactions();

		
	}

	componentDidUpdate() {
		
		console.log(this.props.userTransCollection)
		console.log('props', this.props.transactionGetStatus)
		console.log('state' ,this.state.transactionGetStatus)
	}

	render() {

		return (
			<div>
				{this.props.transactionGetStatus 

				?	(this.props.userTransCollection.map( (transaction, i) => {
				 			return (
				 				<Card className="trans" key={i}>
							   
							        <CardContent>
							          <Typography gutterBottom variant="h5" component="h2">
							            Buy{' '}({transaction.symbol}) - {' '}{transaction.shares}{' @ '}{' '}{transaction.stock_price}
							          </Typography>	
							          <Typography gutterBottom variant="h5" component="h2">
							            Date: 
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


