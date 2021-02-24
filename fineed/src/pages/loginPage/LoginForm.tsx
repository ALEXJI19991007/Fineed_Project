import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import LogoPic from "../../imageSrc/pageIcon.png";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import firebase from "firebase/app";
import "firebase/auth";

export function LoginForm(){
    const  googleAuth = () => {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(googleAuthProvider)    
    }
 

    return(
        <div>
        <Grid container spacing={0} alignContent='center' alignItems='center' justify='center'>
           <Grid item xs={4}></Grid>
           <Grid item xs={4}>
            <Avatar src={LogoPic} style={{height:'80px',width:'80px'}}/>
            <Button variant="contained" color="primary" onClick={googleAuth}>Continue with Google</Button>
            <br/>
            <Button variant='contained' color='secondary'>Continue with Fineed</Button>
           </Grid>
           <Grid item xs={4}></Grid>
        </Grid>
            
        </div>
    )
}
