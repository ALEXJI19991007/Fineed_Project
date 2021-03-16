import React, { useEffect, useState } from "react";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { updateUserPassword } from "../../firebase/FirebaseFunction";
import { useRecoilValue } from "recoil";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";

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
export function EditPwdForm() {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const userId = useRecoilValue(curUserUidAtom);

  const oldPwdOnChange = (event: React.ChangeEvent<{ value: string }>) => {
    setOldPwd(event.target.value);
  };

  const newPwdOnChange = (event: React.ChangeEvent<{ value: string }>) => {
    setNewPwd(event.target.value);
  };


  const handleSubmit = async () => {
    const userData = {
      userId: userId,
      oldPassword: oldPwd,
      newPassword: newPwd,
    };
    console.log(userData);
    const updatePasswordResp = await updateUserPassword(userData);
    if (updatePasswordResp.data === null) {
      console.log("Update Pwd Error");
    } else {
      console.log(updatePasswordResp.data);
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
                id="oldPwd"
                label="Original Password"
                name="oldPwd"
                autoComplete=""
                autoFocus
                onChange={oldPwdOnChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="newPwd"
                label="New Password"
                name="newPwd"
                autoComplete=""
                onChange={newPwdOnChange}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Change Password
              </Button>
            </form>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
