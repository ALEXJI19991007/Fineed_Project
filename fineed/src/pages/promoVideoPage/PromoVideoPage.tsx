import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from 'react-player'
// https://promo.com/share/604eda054b0582038433b3a6?utm_source=old_share_page_share_dialog
// const samplePromoVideo =require("../../videoSrc/SamplePromoVideo.mp4");
import samplePromoVideo from "../../videoSrc/SamplePromoVideo.mp4";

export function PromoVideoPage() {
    const videoRef = useRef<ReactPlayer|null>(null);
    const [seekToState,setSeekToState] = useState(0.0);
    

    const handleWheel =(event:WheelEvent)=>{
        const deltaY = event.deltaY;
        if(deltaY<0){
            console.log('scrolling up');
            if(seekToState>=0&&seekToState<=1&&videoRef.current){
                setSeekToState(seekToState+deltaY*0.01);
                // videoRef.current.seekTo(seekToState);

            }           
        } else if(deltaY > 0){
            console.log('scrolling down');
            if(seekToState>=0&&seekToState<=1&&videoRef.current){
                setSeekToState(seekToState+deltaY*0.01);
                // videoRef.current.seekTo(seekToState);
            }      
        }
        // console.log(deltaY)
    }

    useEffect(()=>{
        if(videoRef.current){
            videoRef.current.seekTo(seekToState);
        }
    
    },[seekToState])
    return(<div style={{border:'solid',marginTop:'10px'}}>
        <ReactPlayer 
           ref={videoRef} 
           width='100%'
           height='100%'
           loop
           muted
           url={samplePromoVideo}
           onWheel={handleWheel}
           
           />
        {/* <iframe frameBorder="0" width="1920" height="1080" src="https://promo.com/embed/604eda054b0582038433b3a6?ratioAspect=wide" allowFullScreen={true}></iframe><p><p>Created with <a href='https://promo.com?utm_source=embed' target='_blank'>promo.com  </a>The World's #1 Marketing Video Maker</p><a href='https://promo.com/share/604eda054b0582038433b3a6?utm_source=embed' target='_blank'>View on Promo.com</a></p> */}
        </div>)
}

