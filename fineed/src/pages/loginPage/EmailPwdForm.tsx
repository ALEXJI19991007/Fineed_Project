import { Fragment, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { curUsernameAtom, curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { getUserAuth } from "../../firebase/FirebaseFunction";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";

export function EmailPwdForm() {
  const setCurUserUid = useSetRecoilState(curUserUidAtom);
  const setCurUsername = useSetRecoilState(curUsernameAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  
  const emailOnChange = (event: React.ChangeEvent<{ value: string }>) => {
    setEmail(event.target.value);
  };

  const passwordOnChange = (event: React.ChangeEvent<{ value: string }>) => {
    setPassword(event.target.value);
  };

  const emailLoginHandler = async () => {
    const getUserAuthResp = await getUserAuth({email: email, password: password});
    if (getUserAuthResp.data === null) {
      console.log("Get User Authentication Failed");
    }
    setCurUsername(getUserAuthResp.data.username);
    setCurUserUid(getUserAuthResp.data.userId);
    history.push('/profile');
  }

  return (
    <Fragment>
      <Typography component="h2" variant="h5">
        Sign in with Fineed Account
      </Typography>
      <br />
      <form noValidate>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justify="center"
        >
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
            onChange={emailOnChange}
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
            onChange={passwordOnChange}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={emailLoginHandler}
          >
            Sign In
          </Button>
        </Grid>
      </form>
    </Fragment>
  );
}
