import React from "react";
import { LoginPageImageCard } from "./LoginPageImageCard";
import { StartButton } from "./StartButton";
import { LoginText } from "./LoginText";

import {CopyRight} from "./CopyRight"
import {LoginForm} from "./LoginForm"

export function LoginPage() {
  return (
    <div style={{marginTop:'200px'}}>
    <LoginForm/>
    <CopyRight/>
    </div>
    // <div>
    //   <Grid container spacing={0}>
    //     <Grid item xs={4}>
    //       <LoginPageImageCard />
    //     </Grid>
    //     <Grid item xs={2}></Grid>
    //     <Grid item xs={4}>
    //       <LoginText />
    //       <StartButton />
    //     </Grid>
    //     <Grid item xs={2}></Grid>
    //   </Grid>
    // </div>
  );
}
