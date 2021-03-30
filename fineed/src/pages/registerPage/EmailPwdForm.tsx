import { Fragment, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "firebase/auth";
import firebase from "firebase/app";
import { useSetRecoilState } from "recoil";
import { curUserInfoAtom } from "../../atoms/UsernameAtom";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import Grid from "@material-ui/core/Grid";
import { getUserAuth_v2 } from "../../firebase/FirebaseFunction";
import { useHistory } from "react-router-dom";
import { KeyboardReturnOutlined } from "@material-ui/icons";
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
    const getUserAuthResp = await getUserAuth_v2({email: email, password: password});
    if (getUserAuthResp.data === null) {
      console.log("Get User Authentication Failed");
    }
    //setCurUsername(getUserAuthResp.data.username);
    setCurUserUid(getUserAuthResp.data.userId);
    history.push('/profile');
  }
  
  const registerHandler = async() => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      if (user === null){
        console.log("error: return null for uid")
        return;
      }
      setCurUserUid(user.uid)
    })
    .catch((error) => {
      // show the login error message
      setAlert(true);

      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
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
