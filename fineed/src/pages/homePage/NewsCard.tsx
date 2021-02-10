import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import sampleTeslaNewsImage from '../../imageSrc/homepage/teslaNewsimg.jpg'

export type News = {
    title: string,
    content: string,
    imgUrl: string | URL
}

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
    media: {
        height: 300,
    },
});

export function NewsCard(props:News) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={sampleTeslaNewsImage}
                    title="Tesla Bitcoin"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    Tesla
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Tesla is a transportation and energy company. It sells vehicles under its ‘Tesla Motors’ division and 
                    stationary battery packs for home, commercial and utility-scale projects under its ‘Tesla Energy’ division.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
        </Button>
                <Button size="small" color="primary">
                    Learn More
        </Button>
            </CardActions>
        </Card>
    )
}