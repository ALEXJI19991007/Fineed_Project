import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


export function CopyRight() {
    return (
      <Typography style={{marginTop:'15px'}} variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://fineed.io">
          Fineed
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }