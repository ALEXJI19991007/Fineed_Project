import { Fragment, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "firebase/auth";
import { useSetRecoilState } from "recoil";
import { curUserInfoAtom } from "../../atoms/UsernameAtom";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import { createNewUser_v2, getUserInfo } from "../../firebase/FirebaseFunction";
import { ERROR } from "../../atoms/constants";

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
  
  const registerHandler = async() => {
    const getCreateUserResp = (await createNewUser_v2({email: email, password: password})).data;
    if (getCreateUserResp.error !== ERROR.NO_ERROR) {
      console.log(getCreateUserResp.error);
      // show the login error message
      setAlert(true);
      return;
    }
    const getUserInfoResp = (await getUserInfo({ userId: getCreateUserResp.resp.userId })).data;
    if (getUserInfoResp.error !== ERROR.NO_ERROR) {
      console.log(getUserInfoResp.error);
      return;
    }
    setCurUserUid(getCreateUserResp.resp.userId);
    setCurUserInfo(getUserInfoResp.resp);
    history.push('/profile');
  }

  return (
    <Fragment>
      <Typography component="h2" variant="h5">
        Sign up to get your customized news feed!
      </Typography>
      <br />
      {alert ? (<Alert severity="error">Email already in use</Alert>) : null}
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
            onClick={registerHandler}
          >
            Sign Up
          </Button>
        </Grid>
      </form>
    </Fragment>
  );
}
