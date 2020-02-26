import React from 'react';
import Grid from '@material-ui/core/Grid';
import Github from '../Images/github.svg';
import LinkedIn from '../Images/linkedin.svg';

 
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
                href="https://iexcloud.io"
                target="_blank"
                rel="noopener noreferrer"
                >Data provided by IEX Cloud</a>
        </Grid>
  );
}

