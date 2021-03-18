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
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { ERROR } from "../../atoms/constants";

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

export function EditProfileForm(props: any) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState(props.username);
  const [msg, setMsg] = useState("");
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
    setMsg("Successfully updated profile!");
    history.push("/profile");
  };

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
          <Typography>{msg}</Typography>
          <Grid item xs={2}>
            <form noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="first_name"
                label="First Name"
                name="first_name"
                autoComplete="firstname"
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
                autoComplete="username"
                onChange={usernameOnChange}
              />
              <Typography variant="body2" color="textSecondary">
                Current username:{" "}
                {props.username === "" ? "not set yet" : props.username}
              </Typography>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Edit
              </Button>
            </form>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
