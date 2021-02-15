import React from 'react';
import { LoginPageImageCard } from './LoginPageImageCard';
import { StartButton } from './StartButton';
import { LoginText } from './LoginText';
import Grid from '@material-ui/core/Grid';


export function LoginPage() {
    return (
        <div >
        <Grid container spacing={0}>
            <Grid item xs={4}>
            <LoginPageImageCard/>
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={4}>
            <LoginText/>
            <StartButton/>
            </Grid>
            <Grid item xs={2}>
            </Grid>
        </Grid>
        
        
        </div> 
    )
}