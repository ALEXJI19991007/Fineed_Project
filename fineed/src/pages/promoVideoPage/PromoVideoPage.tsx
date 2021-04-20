import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from 'react-player'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { blueGrey,yellow } from '@material-ui/core/colors';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import Zoom from '@material-ui/core/Zoom';
import samplePromoVideo from "../../videoSrc/IntroVideo.mp4";
import screenfull from 'screenfull'


const useStyles = makeStyles({
    player:{
        position: 'fixed',
        top:0,
        bottom:0,
        left:0,
        right:0
        // position: 'absolute'
    },
    button: {
        color: blueGrey[500],
        zIndex: 10,
        position: 'fixed',
        top: '50%',
        right: '50%',
        fontSize: 60
    },
});

//TODO Sijian Trim the Promo Page
export function PromoVideoPage() {
    const history = useHistory();
    const classes = useStyles();
    const [isVideoMuted,setIsVideoMuted] = useState(true);
    const [isVideoPlayed,setIsVideoPlayed] = useState(true);
    const [checked, setChecked] = useState(true);
    const playerRef = useRef<any>(null);

    // const videoRef = useRef<ReactPlayer|null>(null);
    // const [seekToState,setSeekToState] = useState(0.0);
    // const handleWheel =(event:WheelEvent)=>{
    //     const deltaY = event.deltaY;
    //     console.log(event.pageY)
    //     if(deltaY<0){
    //         // console.log('scrolling up');
    //         if(seekToState>=0&&seekToState<=1&&videoRef.current){
    //             setSeekToState(seekToState+deltaY*0.01);
    //             // videoRef.current.seekTo(seekToState,'seconds');

    //         }           
    //     } else if(deltaY > 0){
    //         // console.log('scrolling down');
    //         if(seekToState>=0&&seekToState<=1&&videoRef.current){
    //             setSeekToState(seekToState+deltaY*0.01);
    //             // videoRef.current.seekTo(seekToState,'seconds');
    //         }      
    //     }
    //     // console.log(deltaY)
    // }

    // useEffect(()=>{
    //     setTimeout(function(){ setIsVideoMuted(false),setIsVideoPlayed(true) }, 1000);
    // },[])
    const handleVolume =()=>{
        setIsVideoMuted(false);
    }
    const handleClickFullscreen = () => {
        if (screenfull.isEnabled) {
            screenfull.request(playerRef.current?.wrapper);
        }
      };

    return(
        <Fade in={checked} timeout={1300}>
    <div>
        <ReactPlayer 
           className={classes.player}
           width='100%'
           height='100%'
           playing
           controls
           url={samplePromoVideo}
           onEnded={()=>{history.push("/home")}}
           onPlay={handleClickFullscreen}
           ref={playerRef}
           />
           
        </div>
        </Fade>
        )
}

