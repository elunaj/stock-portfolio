import React from 'react';
import Grid from '@material-ui/core/Grid';
// import Github from '../Images/github.svg';
// import LinkedIn from '../Images/linkedin.svg';

 
 export default function Footer() {
  return (
 	<Grid id="footer"
 		style={{'marginTop': '3rem',
 				'marginBottom': '3rem'
 			}}
  		container
  		direction='row'
  		justify='center'
  		alignItems ='center'
  		>
  		<a 
  			href="https://github.com/elunaj/Samplfi" 
  			target="_blank"
  			rel="noopener noreferrer"
  			>
  				<img 
  					// src={Github} 
  					height="50" 
  					width="50"
  					alt="Github" />
  		</a>
  		<a 	
  			href="https://www.linkedin.com/in/eliasluna23/" 
  			target="_blank"
  			rel="noopener noreferrer"
  			>
  				<img 
  					// src={LinkedIn} 
  					height="50" 
  					width="50" 
  					alt="LinkedIn"/>
  		</a>
      <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
  	</Grid>
  );
}

