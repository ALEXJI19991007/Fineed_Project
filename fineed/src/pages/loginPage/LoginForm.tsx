import { useHistory} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import LogoPic from "../../imageSrc/pageIcon.png";
import Grid from "@material-ui/core/Grid";
import { FirebaseAuth } from "../../firebase/FirebaseAuth";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { useSetRecoilState } from "recoil";
import { CopyRight } from "./CopyRight";
import GitHubIcon from "@material-ui/icons/GitHub";
import {
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { Search } from "@trejgun/material-ui-icons-google";
import { EmailPwdForm } from "./EmailPwdForm";
import Typography from "@material-ui/core/Typography";
import { curUserInfoAtom } from "../../atoms/UsernameAtom";
import { getUserInfo } from "../../firebase/FirebaseFunction";
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

export function LoginForm() {
  const setCurUserUid = useSetRecoilState(curUserUidAtom);
  const setCurUserInfo = useSetRecoilState(curUserInfoAtom);
  const history = useHistory();

  const googleLoginHandler = async () => {
    const userId = (await FirebaseAuth.loginWithGoogle()) ?? "";
    const getUserInfoResp = (await getUserInfo({ userId: userId })).data;
    if (getUserInfoResp.error !== ERROR.NO_ERROR) {
      console.log(getUserInfoResp.error);
      return;
    }
    setCurUserUid(userId);
    setCurUserInfo(getUserInfoResp.resp);
    history.push('/profile');
  };

  const githubLoginHandler = async () => {
    const userId = (await FirebaseAuth.loginWithGitHub()) ?? "";
    const getUserInfoResp = (await getUserInfo({ userId: userId })).data;
    if (getUserInfoResp.error !== ERROR.NO_ERROR) {
      console.log(getUserInfoResp.error);
      return;
    }
    setCurUserUid(userId);
    setCurUserInfo(getUserInfoResp.resp);
    history.push('/profile');
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
          <Avatar src={LogoPic} style={{ height: "80px", width: "80px" }} />

          <Grid item xs={4}>
            <EmailPwdForm />
          </Grid>

          <Typography
            style={{ marginTop: "15px" }}
            variant="body2"
            color="textSecondary"
            align="center"
          >
            --- or continue with ---{" "}
          </Typography>

          <Grid item spacing={3}>
            <Search
              style={{
                marginTop: "10px",
                marginRight: "3px",
                width: 40,
                height: 40,
              }}
              color="primary"
              onClick={googleLoginHandler}
            />
            <GitHubIcon
              style={{
                marginTop: "10px",
                marginLeft: "3px",
                width: 40,
                height: 40,
              }}
              color="secondary"
              onClick={githubLoginHandler}
            />
          </Grid>
          <CopyRight />
        </Grid>
      </ThemeProvider>
    </div>
  );
}
