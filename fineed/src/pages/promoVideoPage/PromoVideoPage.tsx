import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from 'react-player'
import { useHistory } from "react-router-dom";
import ShowChartIcon from '@material-ui/icons/ShowChart';
// https://promo.com/share/604eda054b0582038433b3a6?utm_source=old_share_page_share_dialog
// const samplePromoVideo =require("../../videoSrc/SamplePromoVideo.mp4");
import samplePromoVideo from "../../videoSrc/IntroVideo.mp4";

//TODO Sijian Trim the Promo Page
export function PromoVideoPage() {
    const history = useHistory();
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
    return(<div style={{marginTop:'10px'}}>
        <ReactPlayer 
           width='105%'
           height='120%'
           controls
           muted={isVideoMuted}
           playing={isVideoPlayed}
           url={samplePromoVideo}
           onEnded={()=>{history.push("/home")}}
           />
        </div>)
}

