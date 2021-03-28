import React from "react";
import {LoginForm} from "./LoginForm"
import NewsCardBackgroundImg from "../../imageSrc/homepage/NewsCardBackgroundImg.jpg";
import { Card, CardMedia, Grid } from "@material-ui/core";

export function LoginPage() {
  return (
    <div>
    <Grid container>
    <Grid item xs={6} >
    <Card>
        <CardMedia style={{left:0,height: '100vh'}}component="img" image={NewsCardBackgroundImg}/>
      </Card> 
    </Grid>
    <Grid item xs={6} >
    <div style={{marginTop:'200px'}}>  
    <LoginForm/>
    </div>
    </Grid>
    </Grid>    
     
    
    </div>
  );
}
