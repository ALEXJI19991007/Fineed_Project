import React, { useState } from "react";
import {
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { updateUserProfile_v2 } from "../../firebase/FirebaseFunction";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { ERROR } from "../../atoms/constants";
import { curUserInfoAtom } from "../../atoms/UsernameAtom";
import firebase from "firebase";

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

// TODO -- update info when the page is refreshed.
// otherwise when user verifies email the effect
// is not visible until next login
export function EditProfileForm(props: any) {
  const [firstName, setFirstName] = useState(props.userInfo.firstName);
  const [lastName, setLastName] = useState(props.userInfo.lastName);
  const [username, setUsername] = useState(props.userInfo.username);
  const [msg, setMsg] = useState("");
  const [userInfo, setUserInfo] = useRecoilState(curUserInfoAtom);
  const userId = useRecoilValue(curUserUidAtom);
  const history = useHistory();

  const firstNameOnChange = (event: React.ChangeEvent<{ value: string }>) => {
    setFirstName(event.target.value);
  };

  const lastNameOnChange = (event: React.ChangeEvent<{ value: string }>) => {
    setLastName(event.target.value);
  };

  const usernameOnChange = (event: React.ChangeEvent<{ value: string }>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async () => {
    const userData = {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      username: username,
    };
    const updateUserProfileResp = (await updateUserProfile_v2(userData)).data;
    if (updateUserProfileResp.error !== ERROR.NO_ERROR) {
      console.log(updateUserProfileResp.error);
      return;
    }
    const newUserInfo = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: userInfo.email,
    }
    setUserInfo(newUserInfo);
    setMsg("Successfully updated profile!");
    // setFirstName("");
    // setLastName("");
    // setUsername("");
    history.push("/profile");
  };

  // function for sending verification email
  const handleVerify = () => {
    const user = firebase.auth().currentUser;
    // unauthenticated - do nothing
    if(!user) return;

    // Send the email
    let actionCodeSettings = {
      url: `https://fineed.io/verify?userId=${user.uid}`,
      handleCodeInApp: true,
    };
    user.sendEmailVerification(actionCodeSettings)
      .then(() => {
        // Verification email sent.
        // TODO: Frontend -- inform user email is sent
        console.log("Email sent");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

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
          <Grid item xs = {8}>
          <form noValidate>
          <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Typography>{msg}</Typography>
          
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="first_name"
                label="First Name"
                name="first_name"
                autoComplete="firstname"
                value={firstName}
                autoFocus
                onChange={firstNameOnChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                value={lastName}
                autoComplete="lastname"
                onChange={lastNameOnChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                value={username}
                autoComplete="username"
                onChange={usernameOnChange}
              />
              {/* <Typography variant="body2" color="textSecondary">
                Current username:{" "}
                {props.username === "" ? "not set yet" : props.username}
              </Typography> */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Edit
              </Button>
            <Typography            
            style={{ marginTop: "15px" }}
            variant="body2"
            color="textSecondary"
            align="center"> Verified: {userInfo.verified ? "Yes" : "No"}
              </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleVerify}
              >
                Verify
              </Button>
        </Grid>
        </form>
        </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
