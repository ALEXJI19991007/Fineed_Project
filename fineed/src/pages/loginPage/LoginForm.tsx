import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import LogoPic from "../../imageSrc/pageIcon.png";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import { FirebaseAuth } from "../../firebase/FirebaseAuth";
import { curUserUidAtom } from '../../atoms/FirebaseUserAtom';
import { useRecoilState } from 'recoil';


export function LoginForm(){
    const [currentUserUid, setCurUserUid] = useRecoilState(curUserUidAtom);
    
    return(
        <div>
        <Grid container spacing={0} alignContent='center' alignItems='center' justify='center'>
           <Grid item xs={4}></Grid>
           <Grid item xs={4}>
            <Avatar src={LogoPic} style={{height:'80px',width:'80px'}}/>
            <Button variant="contained" color="primary" onClick={async()=>{setCurUserUid( await FirebaseAuth.loginWithGoogle()??'')}}>Continue with Google</Button>
            <Button variant="contained" color="default" onClick={async()=>{setCurUserUid( await FirebaseAuth.loginWithGitHub()??'')}}>Continue with Github</Button>
            <Button variant="contained" color="inherit" onClick={async()=>{await FirebaseAuth.logout(); setCurUserUid('')}}>Log out</Button>
            <br/>
            <Button variant='contained' color='secondary'>Continue with Fineed</Button>
           </Grid>
           <Grid item xs={4}></Grid>
        </Grid>
            
        </div>
    )
}
