import React from 'react';
import { FormControl, InputLabel, Input, FormHelperText, 
FormLabel, Grid, Button, Card } from '@material-ui/core';
import './Card.css';


class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: "",
			signInPassword: "",
			errorMessage: ""
		}
	}

	// handles user email input
	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}


	// handles user password input
	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignin = () => {
		fetch('http://localhost:5000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('buy');
			} else {
				this.setState({
					errorMessage: 'error signing in'
				})
			}
		})
		.catch(err => console.log)
	}

	render() {

		const { onRouteChange } = this.props;

		return (
				<div>
					<Card className="Card">
						<Grid container spacing={4}>

							<Grid item xs={12}>
								<FormLabel>Sign in</FormLabel>
							</Grid>

							<Grid item xs={12}>
								<FormControl>
								  <InputLabel htmlFor="email">Email address</InputLabel>
								  <Input 
								  	id="email" 
								  	type="text"
								  	name="email"
								  	aria-describedby="my-helper-text"
								  	onChange={this.onEmailChange} 
								   />
								</FormControl>
							</Grid>

							<Grid item xs={12}>
								<FormControl>
								  <InputLabel htmlFor="password">Password</InputLabel>
								  <Input 
								  	id="password" 
							      	type="password" 
							      	name="password"
							      	aria-describedby="my-helper-text"
							      	onChange={this.onPasswordChange}
								  	/>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<FormControl>
									 <Button 
									 	variant="outlined" 
								    	onClick={this.onSubmitSignin}
								    	type="submit" 
								    	value="Sign in"
								    	>Sign in
								    </Button>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<FormControl>
								    <Button
								    	variant="outlined" 
								    	onClick={() => onRouteChange('register')}
								    	>Register
								    </Button>
							    </FormControl>
						  </Grid>
						  <Grid 
						  	container
						  	direction="row"
          					alignItems= "center"
          					justify="center"
						  >
						  	  {this.state.errorMessage.length > 0 
							  	? <FormHelperText 
							  		style={{'color': 'red',
							  		'fontSize': '1rem',
							  		'marginBottom': '1rem'}}
							  		id="my-helper-text">
									{this.state.errorMessage}
							  </FormHelperText>
								: null}

						  </Grid>
					</Grid>
				</Card>
			  </div>

			);
		}
	}

export default Signin;