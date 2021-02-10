import React from 'react';
import { HomePageImageCard } from './HomePageImageCard';
import { NewsCardContainer } from './homePageContainer/NewsCardContainer';

export function HomePage(){
    return (
    <div>
        <HomePageImageCard/>
        <div style={{marginTop: '70px',marginLeft:'300px'}}>
            <NewsCardContainer/>
        </div>
        
    </div>
    )
}