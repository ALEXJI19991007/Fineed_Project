import React, { useEffect, useState } from "react";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { updateUserProfile } from "../../firebase/FirebaseFunction";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { useRecoilValue } from "recoil";
import { useHistory} from "react-router-dom";

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
export function EditProfileForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
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
    console.log(userData);
    const updateUserProfileResp = await updateUserProfile(userData);
    if (updateUserProfileResp.data === null) {
      console.log("Uplate failed");
    } else {
      history.push('profile')
    }
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
