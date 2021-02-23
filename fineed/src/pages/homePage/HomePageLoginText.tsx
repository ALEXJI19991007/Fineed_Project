import React, { useEffect, useState } from "react";
import useScrollPosition from "@react-hook/window-scroll";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";



export function HomePageLoginText() {
    var initialPosition = 250
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
      
    <Card elevation={10}>
      <Typography variant="h2" className={classes.pos}> Feed the financial news you are most interested in</Typography>
    </Card>
  );
}
