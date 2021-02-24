import React, { useEffect, useState } from "react";
import {createMuiTheme,makeStyles,ThemeProvider} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useScrollPosition from "@react-hook/window-scroll";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary:{main:'#00DC16'} ,
  },
});

export function LoginButton() {
    var initialPosition = 190
  const scrollY = useScrollPosition(60 /*fps*/);
  const [imgHeight, setImgHeight] = useState(initialPosition);
  const [scrollState,setScrollState] = useState(false);

  useEffect(() => {
    if (scrollY <= 500 && !scrollState) {
      setImgHeight(initialPosition + 0.5*scrollY);
    } else {
      //setScrollState(true);
      setImgHeight(300);
    }
  }, [scrollY,scrollState]);

    const txtStyle = makeStyles({
        pos: {
            position: 'absolute',
            bottom: imgHeight,
            right: '20px',
            color: 'black',
            paddingLeft:'900px',
            paddingRight: '100px',
        },
      });
    
      const classes = txtStyle();

  return (
    <Grid container spacing={0} className={classes.pos}>
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
  );
}
