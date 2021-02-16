import React from 'react';
import { HomePageImageCard } from './HomePageImageCard';
import { NewsCardContainer } from './homePageContainer/NewsCardContainer';

export function HomePage(){
    return (
    <div>
        <HomePageImageCard/>
        <div>
            <NewsCardContainer/>
        </div>
        
    </div>
    )
}