import React, { useState } from "react";
import {
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { updateUserPassword_v2 } from "../../firebase/FirebaseFunction";
import { useRecoilValue } from "recoil";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { ERROR } from "../../atoms/constants";
import { Typography } from "@material-ui/core";

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
  const pwdReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [err, setErr] = useState("");
  const [notify, setNotify] = useState("");
  const userId = useRecoilValue(curUserUidAtom);

  const oldPwdOnChange = (event: React.ChangeEvent<{ value: string }>) => {
    setOldPwd(event.target.value);
  };

  const newPwdOnChange = (event: React.ChangeEvent<{ value: string }>) => {
    setErr("")
    setNewPwd(event.target.value);
    if (!newPwd.match(pwdReg)){
      setErr("New password must contain at least 8 characters, at least one letter and one number.")
    }
  };


  const handleSubmit = async () => {
    const userData = {
      userId: userId,
      oldPassword: oldPwd,
      newPassword: newPwd,
    };
    const updatePasswordResp = (await updateUserPassword_v2(userData)).data;
    if (updatePasswordResp.error !== ERROR.NO_ERROR) {
      setNotify("Old password doesn't match our record.")
      console.log(updatePasswordResp.error);
      return;
    }
    setNotify("Successfully changed password!")
    setOldPwd("");
    setNewPwd("");
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
          <form noValidate>
          <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justify="center"
        >
           <Typography>{notify}</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="oldPwd"
                label="Original Password"
                name="oldPwd"
                autoComplete=""
                value={oldPwd}
                type="password"
                helperText="Leave it blank if you haven't set a password."
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
                type="password"
                autoComplete=""
                value={newPwd}
                onChange={newPwdOnChange}
                helperText = {err}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Change Password
              </Button>
              </Grid>
        </form>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
