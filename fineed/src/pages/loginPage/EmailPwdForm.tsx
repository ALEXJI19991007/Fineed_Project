import React , {Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles,ThemeProvider,createMuiTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

export function EmailPwdForm() {
    return (
        <Fragment>
        
        <Typography component="h2" variant="h5">
        Sign in with Fineed Account
      </Typography>
      <br/>
        <form noValidate>
        <Grid container spacing={3} direction="column" alignItems="center" justify="center">
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <br/>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          </Grid>
        </form>
        </Fragment>
    )
}