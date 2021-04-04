import "firebase/auth";
import { EmailPwdForm } from "../loginPage/EmailPwdForm";
import {
    ThemeProvider,
    createMuiTheme,
  } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LogoPic from "../../imageSrc/pageIcon.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import { FirebaseAuth } from "../../firebase/FirebaseAuth";

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
            <EmailPwdForm userHookFunc={FirebaseAuth.registerWithEmail} 
              prompt="Sign up to get your customized news feed!"
              errorMsg="Email already in use." buttonText="Sign Up"/>
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