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
    link: string,
    title: string,
    content: string,
    imgUrl: string | URL,
    pubDate: string,
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
                    image={sampleTeslaNewsImage} //need to change to the real url
                    title={props.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    {props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {props.content}
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