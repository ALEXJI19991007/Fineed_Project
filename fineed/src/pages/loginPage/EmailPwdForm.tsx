import { Fragment, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { getUserInfo } from "../../firebase/FirebaseFunction";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ERROR } from "../../atoms/constants";
import { curUserInfoAtom } from "../../atoms/UserInfoAtom";

// expected props:
// { userHookFunc: function, prompt: string, errorMsg: string, buttonText: string }
// userHookFunc is the firebase function that should be called by the
// button onClick eventhandler.
// 
// if registering: userHookFunc should be FirebaseAuth.registerWithEmail(password, email)
// if logining in: userHookFunc should be FirebaseAuth.loginWithEmail(password, email)
export function EmailPwdForm(props: any) {
  const setCurUserUid = useSetRecoilState(curUserUidAtom);
  const setCurUserInfo = useSetRecoilState(curUserInfoAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  // states for the login warning message
  let [emailWarning, setEmailWarning] = useState("");
  let [passwdWarning, setPasswdWarning] = useState("");
  const clearWarnings = () => {
    setEmailWarning(""); 
    setPasswdWarning("");
  };
  
  const emailOnChange = (event: React.ChangeEvent<{ value: string }>) => {
    setEmail(event.target.value);
  };

  const passwordOnChange = (event: React.ChangeEvent<{ value: string }>) => {
    setPassword(event.target.value);
  };

  const emailLoginHandler = async () => {
    let isOk: boolean = true;
    clearWarnings();
    if(!email){ // check for if there is email
      setEmailWarning("Please enter your email address.");
      isOk = false;
    }
    else if(!isValidEmail(email)){ // check for proper email format
      setEmailWarning("Please enter an email with a valid format.");
      isOk = false;
    }

    if(!password) { // check if there is password
      setPasswdWarning("Please enter your password.");
      isOk = false;
    }
    if(!isOk) return;

    const getUserAuthResp = await props.userHookFunc(email, password);
    if (getUserAuthResp.error !== ERROR.NO_ERROR) {
      console.log(getUserAuthResp.error);
      // show the login error message
      setEmailWarning(props.errorMsg);
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
        {props.prompt}
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
            helperText={emailWarning}
            error={emailWarning !== ""}
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
            helperText={passwdWarning}
            error={passwdWarning !== ""}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={emailLoginHandler}
          >
            {props.buttonText}
          </Button>
        </Grid>
      </form>
    </Fragment>
  );
}

// helper function for checking if an email is properly formatted
const isValidEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(re)? true : false;
}
