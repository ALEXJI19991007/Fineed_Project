import React, { useEffect, useState } from "react";
import useScrollPosition from "@react-hook/window-scroll";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import HomePageImagePic from "../../imageSrc/homepage/HomePageImagePic.png";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles,ThemeProvider,createMuiTheme } from "@material-ui/core/styles";

const INITIALHEIGHT = 1100;
const INITSLOGANBOTTOM = 250;
const INITSLOGANPADDINGLEFT = 900;
const INITLOGINBUTTONBOTTOM = 190;
const INITSLOGINBUTTONPADDINGLEFT = 900;

const theme = createMuiTheme({
  palette: {
    primary:{main:'#00DC16'} ,
  },
});

const imgCardStyle = makeStyles({
  card: {
    position: 'relative',
  },
  cardImg: {
    
  },
  loginCard: {
    position: 'absolute',
  },
  sloganPos: {
    position: 'absolute',
    right: '20px',
    color: 'black',
    marginBottom: 100,
    fontFamily: "-apple-system",
},
 loginButton: {
     position: 'absolute',
     right: '20px',
     color: 'black',
 }
});

export function HomePageImageCard() {
  const classes = imgCardStyle();
  const scrollY = useScrollPosition(60 /*fps*/);
  const [imgHeight, setImgHeight] = useState(INITIALHEIGHT);
  const [solganBottom, setSolganBottom] = useState(INITSLOGANBOTTOM);
  const [sloganPaddingLeft, setSloganPaddingLeft] = useState(INITSLOGANPADDINGLEFT);
  const [loginButtonBottom, setLoginButtonBottom] = useState(INITLOGINBUTTONBOTTOM);
  const [loginButtonPaddingLeft,setLoginButtonPaddingLeft] = useState(INITSLOGINBUTTONPADDINGLEFT);
  const [scrollState,setScrollState] = useState(false);

  useEffect(() => {
    if (scrollY <= 330 && !scrollState) {
      setImgHeight(INITIALHEIGHT - scrollY);
      setSolganBottom(INITSLOGANBOTTOM + scrollY * 0.5);
      setSloganPaddingLeft(INITSLOGANPADDINGLEFT + scrollY * 0.3);
      setLoginButtonBottom(INITSLOGANBOTTOM + scrollY * 0.5);
      setLoginButtonPaddingLeft(INITSLOGINBUTTONPADDINGLEFT + scrollY * 0.3);
    } else {
      setScrollState(true);
      setImgHeight(imgHeight);
      setSolganBottom(solganBottom);
      setSloganPaddingLeft(sloganPaddingLeft);
      setLoginButtonBottom(loginButtonBottom);
      setLoginButtonPaddingLeft(loginButtonPaddingLeft);
    }
  }, [scrollY,scrollState]);
  return (
    <Card elevation={0} style={{height:imgHeight}}>
      <CardMedia className={classes.cardImg} component="img" image={HomePageImagePic}/>
      <Typography variant="h3" className={classes.sloganPos} style={{bottom: solganBottom,paddingLeft: sloganPaddingLeft}}> Feed the financial news you are most interested in</Typography>
      <Grid container spacing={0} className={classes.loginButton} style={{bottom:loginButtonBottom,paddingLeft: loginButtonPaddingLeft}}>
      <Grid item xs={2}></Grid>
      <Grid item xs={5}>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary">
            Start Now
          </Button>
        </ThemeProvider>
      </Grid>
      <Grid item xs={3}>
        <div style={{ margin: "10px" }}>
          <Link to="/login" style={{ color: "black", fontFamily: "-apple-system" }}>
            LOG IN
          </Link>
        </div>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>

    </Card>
  );
}
