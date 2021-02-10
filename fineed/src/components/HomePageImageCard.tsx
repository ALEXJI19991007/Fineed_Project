import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import HomePageImagePic from '../imageSrc/homepage/HomePageImagePic.jpg'

export function HomePageImageCard() {
    return (
        <Card>
            <CardMedia
                component="img"
                height="350"
                image={HomePageImagePic}
            />
        </Card>
    )

}