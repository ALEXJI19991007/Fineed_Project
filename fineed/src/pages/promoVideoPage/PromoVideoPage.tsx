import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from 'react-player'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { blueGrey,yellow } from '@material-ui/core/colors';
import samplePromoVideo from "../../videoSrc/IntroVideo.mp4";


const useStyles = makeStyles({
    page:{
        zIndex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: yellow['A400'],
        float:'left',
    },
    player:{
       
        // position: 'absolute'
    },
    volum: {
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
    return(<div className={classes.page}>
        {isVideoMuted?<VolumeUpIcon className={classes.volum} onClick={handleVolume}/>:null}
        <ReactPlayer 
           className={classes.player}
           width='100%'
           height='100%'
           muted={isVideoMuted}
           playing={isVideoPlayed}
           url={samplePromoVideo}
           onEnded={()=>{history.push("/home")}}
           />
           
        </div>)
}

