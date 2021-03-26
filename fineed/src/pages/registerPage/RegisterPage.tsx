import React from 'react';
import "firebase/auth";
import { EmailPwdForm } from "./EmailPwdForm";
import {
    ThemeProvider,
    createMuiTheme,
  } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LogoPic from "../../imageSrc/pageIcon.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

const theme = createMuiTheme({
    palette: {
      primary: { main: "#00DC16" }, //green
      secondary: { main: "#3e4444" }, //gray
    },
    typography: {
      h1: {
        fontSize: 200,
      },
      h2: {
        fontSize: 5,
      },
    },
  });
export function RegisterPage () {
    return (
        <div>
           <ThemeProvider theme={theme}>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Avatar src={LogoPic} style={{ height: "80px", width: "80px" }} />

          <Grid item xs={2}>
            <EmailPwdForm />
          </Grid>

          <Typography
            style={{ marginTop: "15px" }}
            variant="body2"
            color="textSecondary"
            align="center"
          >
            --- already have an account? ---{" "}
          </Typography>
          <Grid item xs={2}>
            <Link to='/login'> Log in </Link>
          </Grid>
          </Grid>
          </ThemeProvider>
        </div>
    )
}