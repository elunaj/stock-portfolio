import React from 'react';
import { FormControl, InputLabel, Input, FormHelperText, 
FormLabel, Grid, Button, Card } from '@material-ui/core';
import '../Signin/Card.css';

// Regex used to compare user email against
// If user email doesn't match regex pattern, we 
// add error message to errorForm state
const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


// Checks for errors in formError state
// after user submits registration form
const formValid = ({ formErrors, ...rest }) => {
	let valid = true;

	Object.values(formErrors).forEach( val => {
		val.length > 0 && (valid = false);
	});

	Object.values(rest).forEach(val => {
		val === null && (valid = false);
	});

	return valid;
};


class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			  formErrors: {
			  	firstName: '',
			  	lastName: '',
        		email: '',
        		password: ''
      		},
      		errorMessage: '',
		}
	}

	// handles form submission
	handleSubmit = e => {

		e.preventDefault();
		
		if (formValid(this.state)) {
			this.onSubmitRegister();
		} else {
			this.setState({
				errorMessage: 'registration error'
			})
		}
	}

	// handles user input
	handleChange = e => {

		e.preventDefault();

		const { name, value } = e.target;
		let formErrors = this.state.formErrors;

		// switch conditions users input is checked against
		// updates state dynamically on user input
		switch (name) {
			case "firstName":
				formErrors.firstName = value.length > 0 
				? ""
				: "Please input first name"
			break;
			case "lastName":
				formErrors.lastName = value.length > 0 
				? ""
				: "Please input last name"
			break;
			case "email":
				formErrors.email = 
				emailRegex.test(value) && value.length > 0
				? ""
				: "invalid email address"
			break;

			case "password":
				formErrors.password = 
				value.length < 6 && value.length > 0
				? "minimum 6 characters required"
				: ""
			break;
			default: 
			break;
		}	

		this.setState({ formErrors, [name]: value }, () => {
		})

	}

	// handles user registration
	// if registration passes validation
	// tests and email is unique user is added
	// and redirected to buy page
	onSubmitRegister = () => {

		fetch('https://stark-taiga-05033.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.firstName + ' ' + this.state.lastName,
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('buy');
				this.setState({
					errorMessage: ''
				})
			} else {
				this.setState({
				errorMessage: 'email already exists'
				})
			}

		})
	}

	render() {

		const { formErrors } = this.state;

		return (

			<div>
				<Card className="Card">
					<Grid container spacing={4}>

						<Grid item xs={12}>
							<FormLabel>Register</FormLabel>
						</Grid>


						<Grid item xs={6}>
							<FormControl>
							  <InputLabel htmlFor="firstName">First Name</InputLabel>
							  <Input 
							  	id="firstName" 
						      	type="text" 
						      	name="firstName"
							  	aria-describedby="my-helper-text"
							  	onChange={this.handleChange} 
							   />

							  {formErrors.firstName.length > 0 && (
							  	<FormHelperText 
							  		style={{
							  		'color': 'red',
							  		'fontSize': '.8rem'
							  	}}
							  		id="my-helper-text">
									{formErrors.firstName}
							  </FormHelperText>)}
							  
							</FormControl>
						</Grid>

						<Grid item xs={6}>
							<FormControl>
							  <InputLabel htmlFor="lastName">Last Name</InputLabel>
							  <Input 
							  	id="lastName" 
						      	type="text" 
						      	name="lastName"
							  	aria-describedby="my-helper-text2"
							  	onChange={this.handleChange} 
							   />

							  {formErrors.lastName.length > 0 && (
							  	<FormHelperText 
							  		style={{
							  		'color': 'red',
							  		'fontSize': '.8rem'
							  	}}
							  		id="my-helper-text">
									{formErrors.lastName}
							  </FormHelperText>)}
							  
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl>
							  <InputLabel htmlFor="email">Email address</InputLabel>
							  <Input 
							  	id="email" 
						      	type="email" 
						      	name="email"
							  	aria-describedby="my-helper-text"
							  	onChange={this.handleChange} 
							   />

							  {formErrors.email.length > 0 && (
							  	<FormHelperText 
							  		style={{
							  		'color': 'red',
							  		'fontSize': '.8rem'
							  	}}
							  		id="my-helper-text">
									{formErrors.email}
							  </FormHelperText>)}
							  
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
						      	onChange={this.handleChange}
							  	/>

							  	{formErrors.password.length > 0 && (
							  	<FormHelperText 
							  		style={{
							  		'color': 'red',
							  		'fontSize': '.8rem'
							  		
							  	}}
							  		id="my-helper-text">
									{formErrors.password}
							  </FormHelperText>)}
					
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl>
								 <Button 
								 	variant="outlined" 
							    	onClick={this.handleSubmit}
							    	type="submit" 
							    	value="Sign Up"
							    	>SIGN UP
							    </Button>
							    {this.state.errorMessage.length > 0 && (
							  	<FormHelperText 
							  		style={{
							  		'color': 'red',
							  		'fontSize': '1rem'
							  		
							  	}}
							  		id="my-helper-text">
									{this.state.errorMessage}
							  </FormHelperText>)}

							</FormControl>
						</Grid>

					</Grid>
				</Card>
			  </div>
		);
	}

}

export default Register;