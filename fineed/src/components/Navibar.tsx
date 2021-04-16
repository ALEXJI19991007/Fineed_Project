import React from "react";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { curUserUidAtom } from "../atoms/FirebaseUserAtom";
import { NaviDrawerOpenStateAtom } from "../atoms/NaviAtom";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import StarsIcon from "@material-ui/icons/Stars";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Tooltip from '@material-ui/core/Tooltip';
import { FirebaseAuth } from "../firebase/FirebaseAuth";
import { ListItemIcon } from "@material-ui/core";
import { curUserInfoAtom } from "../atoms/UserInfoAtom";
import { INITIAL_SUBS_LIST, userSubscriptionStatusAtom } from "../atoms/UserSubscriptionStatusAtom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(4),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
      color: "black",
      fontFamily: "-apple-system",
      textTransform: "lowercase",
    },
    titleF: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
      color: "black",
      fontFamily: "-apple-system",
      textTransform: "uppercase",
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    iconColor: {
      fill: "black",
    },
    topMenu: {
      marginLeft: 10,
      marginRight: 20,
    },
    typography: {
      color: "black",
      fontFamily: "-apple-system",
    },
    logInButton: {
      marginLeft: 10,
      marginRight: -10,
    },
    fineedLoginButton: {
      textTransform: "lowercase",
    },
  })
);

const emptyList: string[] = [];
const emptyJson = {};
export function NaviBar() {
  let location = useLocation();
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const [currentUserUid, setCurUserUid] = useRecoilState(curUserUidAtom);
  const setCurUserInfo = useSetRecoilState(curUserInfoAtom);
  const setNaviDrawerState = useSetRecoilState(NaviDrawerOpenStateAtom);
  const setUserSubscriptionStatus = useSetRecoilState(userSubscriptionStatusAtom);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const fineedOnClick = () => {
    history.push("/home");
  };

  const profileOnClick = () => {
    history.push("/profile");
  };

  const myNewsOnClick = () => {
    history.push("/mynews");
  };

  const companyNewsOnClick = () => {
    history.push("/companynews");
  };

  const logoutOnClick = async () => {
    await FirebaseAuth.logout();
    setCurUserUid("");
    const emptyUserInfo = {
      username: "",
      lastName: "",
      firstName: "",
      email: "",
      favorite: emptyList,
      history: emptyList,
      subscription: emptyJson,
      verified: false,
    };
    setCurUserInfo(emptyUserInfo);
    setUserSubscriptionStatus(INITIAL_SUBS_LIST);
    handleMenuClose();
    history.push("/home");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={logoutOnClick}>
        <ExitToAppIcon />
        Logout
      </MenuItem>
      <MenuItem onClick={profileOnClick}>
        <AccountBoxIcon />
        Profile
      </MenuItem>
      <MenuItem onClick={myNewsOnClick}>
        <StarsIcon />
        My News
      </MenuItem>
    </Menu>
  );
  if (location.pathname === "/") {
    return null;
  }

  return (
    <div className={classes.grow}>
      <AppBar elevation={0} position="fixed" style={{ background: "white" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setNaviDrawerState(true);
            }}
          >
            <MenuIcon className={classes.iconColor} />
          </IconButton>
          <Button onClick={fineedOnClick}>
            <Typography
              className={classes.titleF}
              variant="h6"
              noWrap
              onClick={() => {
                history.push("/");
              }}
            >
              F
            </Typography>
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              onClick={() => {
                history.push("/");
              }}
            >
              ineed
            </Typography>
          </Button>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button
              className={classes.topMenu}
              color="secondary"
              onClick={companyNewsOnClick}
            >
              <Typography
                className={classes.typography}
                variant="subtitle1"
                noWrap
              >
                COMPANY NEWS
              </Typography>
            </Button>
            {!currentUserUid ? <Tooltip title="You should login first">
              <Button
                className={classes.topMenu}
                color="secondary"
              >
                <Typography
                  className={classes.typography}
                  variant="subtitle1"
                  noWrap
                >
                  Barrage
              </Typography>
              </Button>
            </Tooltip> : <Button
              className={classes.topMenu}
              color="secondary"
              onClick={() => {
                history.push("/barrage");
              }}
            >
              <Typography
                className={classes.typography}
                variant="subtitle1"
                noWrap
              >
                Barrage
              </Typography>
            </Button>}
            {currentUserUid ? (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle className={classes.iconColor} />
              </IconButton>
            ) : (
              <Button
                className={classes.logInButton}
                color="secondary"
                onClick={() => {
                  history.push("/login");
                }}
              >
                <Typography
                  className={classes.typography}
                  variant="subtitle1"
                  noWrap
                >
                  LOG IN
                </Typography>
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
