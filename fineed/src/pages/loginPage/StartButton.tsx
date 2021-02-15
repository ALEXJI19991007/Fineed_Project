import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  })

export function StartButton (){
    return(
        <Grid container spacing={0}>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={5}>
            <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary">
                Start Now
            </Button>
            </ThemeProvider>
            </Grid>
            <Grid item xs={3}>
                Login
            </Grid>
            <Grid item xs={2}>
            </Grid>
      </Grid>
    )
}
