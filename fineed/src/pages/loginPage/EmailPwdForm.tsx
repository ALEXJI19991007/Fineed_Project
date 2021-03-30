import { Fragment, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { getUserAuth_v2, getUserInfo } from "../../firebase/FirebaseFunction";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ERROR } from "../../atoms/constants";
import { curUserInfoAtom } from "../../atoms/UsernameAtom";
import Alert from '@material-ui/lab/Alert';

export function EmailPwdForm() {
  const setCurUserUid = useSetRecoilState(curUserUidAtom);
  const setCurUserInfo = useSetRecoilState(curUserInfoAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  // state for the login error message
  let [alert, setAlert] = useState(false);
  
  const emailOnChange = (event: React.ChangeEvent<{ value: string }>) => {
    setEmail(event.target.value);
  };

  const passwordOnChange = (event: React.ChangeEvent<{ value: string }>) => {
    setPassword(event.target.value);
  };

  const emailLoginHandler = async () => {
    const getUserAuthResp = (await getUserAuth_v2({email: email, password: password})).data;
    if (getUserAuthResp.error !== ERROR.NO_ERROR) {
      console.log(getUserAuthResp.error);
      // show the login error message
      setAlert(true);
      return;
    }
    const getUserInfoResp = (await getUserInfo({ userId: getUserAuthResp.resp.userId })).data;
    if (getUserInfoResp.error !== ERROR.NO_ERROR) {
      console.log(getUserInfoResp.error);
      return;
    }
    setCurUserUid(getUserAuthResp.resp.userId);
    setCurUserInfo(getUserInfoResp.resp);
    history.push('/profile');
  }

  return (
    <Fragment>
      <Typography component="h2" variant="h5">
        Sign in with Fineed Account
      </Typography>
      <br />
      {alert ? (<Alert severity="error">Incorrect email or password</Alert>) : null}
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
