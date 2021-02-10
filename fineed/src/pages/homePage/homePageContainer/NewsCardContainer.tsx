import React from 'react';
import { List } from 'immutable';
import { NewsCard } from '../NewsCard';
import { News } from '../NewsCard';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type NewsCardGridProps = {
    newsList: List<News>
}

//simualte the backend existed data
function fakeNews(): List<News> {
    const arr = [];

    const sampleNews = {
        title: 'Tesla',
        content: 'Tesla is a transportation and energy company. It sells vehicles under its ‘Tesla Motors’ division and stationary battery packs for home, commercial and utility-scale projects under its ‘Tesla Energy’ division.',
        imgUrl: 'not even exist, we should have a web imgUrl'
    }
    // we shouldn't use for loop anywhere in our code, since this is only for demo 
    for (let i = 0; i < 10; i++) {
        arr.push(sampleNews)
    }
    const data = List<News>(arr);
    return data
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);



function NewsCardGrid(props: NewsCardGridProps) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {props.newsList.map((news) => {
                    return (
                        <Grid item xs={12} sm={6}>
                            <div className={classes.paper}>
                                <NewsCard title={news.title} content={news.content} imgUrl={news.imgUrl} />
                            </div>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}




export function NewsCardContainer() {

    return (
        <div>
            <NewsCardGrid newsList={fakeNews()} />
        </div>
    )


}