import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import LoginPageImagePic from "../../imageSrc/loginpage/LoginPageImagePic.png";

const imgStyle = makeStyles({
  pos: {
    borderRadius: "0px 25px 25px 0px",
    width: "400px",
    height: "500px",
    position: "relative",
    top: "100px",
  },
});

export function LoginPageImageCard() {
  const classes = imgStyle();
  return (
    <Card className={classes.pos}>
      <CardMedia
        component="img"
        height="350"
        image={LoginPageImagePic}
        style={{ objectFit: "fill" }}
      />
    </Card>
  );
}
