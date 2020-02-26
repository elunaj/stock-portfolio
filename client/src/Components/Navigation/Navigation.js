import React from 'react';
import { Grid, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
// import Logo from '../Images/logo.svg';
import './Navigation.css';


const Navigation = ( { onRouteChange, isSignedIn, email }) => {
		
		if(isSignedIn) {
			return (

				<AppBar position="static" 
					style={{
						'background-color': 'black'
					}}>

				  <Toolbar>
				    <Grid 
				  	container
					direction="row"
					alignItems = 'center'
					justify="flex-start"
				  	>
				  	<img 
				  		className="marginRight"
				  		// src={Logo} 
		                height="50" 
		                width="50"
		                alt="Logo"
		                  />  
				     <Typography variant="h6">
				      Stock App
				    </Typography>
				    </Grid>

				    <Grid 
				    	container
						direction="row"
						alignItems = 'center'
						justify="flex-end"
				    	>	

				    	<Button 
				    	color="inherit"
				    	onClick={() => onRouteChange('portfolio')}
				    	>Portfolio
				    	</Button> 

				    	<Typography 
						 	style={{'marginLeft': '5px'}}
					    	variant="h6">
					      |
				    	</Typography>

				 		<Button 
				    	color="inherit"
				    	onClick={() => onRouteChange('transactions')}
				    	>Transactions
				    	</Button> 

						 <Typography 
						 	style={{'marginLeft': '5px'}}
					    	variant="h6">
					      |
				    	</Typography>

					    <Button 
					    	color="inherit"
					    	onClick={() => onRouteChange('signout')}
					    	>Sign out
					    </Button>
				    </Grid>
				  </Toolbar>
				</AppBar>

			);
		} else {
			return (

				<AppBar 
					position="static" 
					className="MuiAppBar-colorPrimary"
					style={{
						'background-color': 'black'
					}}
					>
				  <Toolbar>

				  <Grid
				  	container
					direction="row"
					alignItems = 'center'
					justify="flex-start"
				  	>
				  	<img 
				  		className="marginRight"
				  		// src={Logo} 
		                height="50" 
		                width="50"
		                alt="Logo"
		                  />  
				    <Typography variant="h6">
				      Stock App
				    </Typography>
				    </Grid>

				    <Grid 
						container
						direction="row"
						alignItems = 'flex-end'
						justify="flex-end"
						>				    
				    <Button 
				    	color="inherit"
				    	onClick={() => onRouteChange('signin')}
				    	>Sign In
				    </Button>
				    <Button 
				    	color="inherit"
				    	onClick={() => onRouteChange('register')}
				    	>Register
				    </Button>
				    </Grid>
				  </Toolbar>
				</AppBar>

			);
		}
	
}

export default Navigation;

