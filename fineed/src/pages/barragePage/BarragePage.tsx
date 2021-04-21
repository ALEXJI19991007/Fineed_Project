import React, { RefObject, useEffect, useRef, useState } from "react";
import { makeStyles, withStyles,Theme,createStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';
import fineedDefaultNewsPicture from "../../imageSrc/homepage/FineedDefaultNewsPicture.jpg";
import Collapse from '@material-ui/core/Collapse';
import Zoom from '@material-ui/core/Zoom';
import { curUserUidAtom } from '../../atoms/FirebaseUserAtom'
import { useRecoilState, useRecoilValue } from "recoil";
import { storeUserBarrage } from "../../firebase/FirebaseFunction";
import { useBarrages } from "../../firebase/FirebaseFireStore";
import { Barrage, BarrageSnapShotAtom } from "../../atoms/BarrageSnapShotAtom";
import { StockChart } from "./StockChart";
import { BarrageHoverTimeStampAtom } from "../../atoms/BarrageHoverTimeStampAtom";
import { BarrageFocusTimeRangeAtom } from "../../atoms/BarrageFocusTimeRangeAtom";
import BarragePicture from "../../imageSrc/barragepage/barragePagePic3.jpg";
import { YAHOONEWSDEFAULTPICTUREURL } from "../homePage/NewsCard";

const useStyles = makeStyles((theme: Theme)=>createStyles({
    NBCardRoot: {
        width:'100vh',
        height: 200,
      },
      NBCardtitle: {
        height: 40,
        overflow: "hidden",
        margin: theme.spacing(1),
      },
      NBCardcontent: {
        height: 40,
        overflow: "hidden",
        wordWrap: "break-word",
        padding: theme.spacing(1),
      },
      NBCardmedia: {
        height: 100,
      },
      NBCardtext: {
        wordWrap: "break-word",
      },
      NBCardcardAction: {
        marginTop: 10,
      },

    page: {
        backgroundImage: `url(${BarragePicture})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    table: {
        float: 'left',
        marginTop: '1000px'
    },
    stockChart: {
        height: '700px',
        width: '700px',
        float: 'left',
        marginLeft: '40px',
        marginTop: '80px'
    },
    chatSection: {
        borderRadius: 8,
        width: '80vh',
        float: 'left',
        marginLeft: '5%'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto',
    },
    listItemText: {
        align: 'right',
    },
    sendMessageArea: {
        padding: '4px'
    },
    focusItem: {
        backgroundColor: '#81d4fa',
        borderRadius: 7,
        paddingRight: '10px',
        paddingLeft: '10px'
    },
    nonFocusItem: {

    }
}));

function timeConverter(UNIX_timestamp: number): string {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}
type BarrageBoxProps = {
    barrageArray: Barrage[],
}

type BarrageItemWithFocus = Barrage & { focus: boolean };

type BarrageItemProps = BarrageItemWithFocus & {focusRef: RefObject<HTMLDivElement> | null};

type isInTheViewParaType = {
    elementClientHeight: number,
    elementOffsetTop: number,
    containerClientHeight: number,
    containerScrollTop: number,
}

type BarrageListPropsType = {
    barrage: BarrageItemWithFocus,
    focusRef: RefObject<HTMLDivElement> | null,
}

function BarrageItem(props: BarrageItemProps) {
    const classes = useStyles();
    if(props.tag === 'news'&& props.NBTitle && props.NBImgUrl){
        return <Card className={classes.NBCardRoot} ref={props.focusRef}>
        <CardActionArea
          onClick={async () => {
          }}
        >
          <CardMedia
            className={classes.NBCardmedia}
            image={(props.NBImgUrl && props.NBImgUrl!==YAHOONEWSDEFAULTPICTUREURL) ? props.NBImgUrl : fineedDefaultNewsPicture}
            title={props.NBTitle??'fineed news'}
          />
          <CardContent className={classes.NBCardtitle}>
            <Typography
              className={classes.NBCardtext}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {props.NBTitle}
            </Typography>
          </CardContent>
          <CardContent className={classes.NBCardcontent}>
            <Typography
              className={classes.NBCardtext}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {props.content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.NBCardcardAction}>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button
            size="small"
            color="primary"
          >
            Favorite
          </Button>
        </CardActions>
      </Card>
    }else{
        return <Grid container className={props.focus ? classes.focusItem : classes.nonFocusItem} ref={props.focusRef}>
        <Grid item xs={12}>
            <ListItemText className={classes.listItemText} primary={props.content}></ListItemText>
        </Grid>
        <Grid item xs={12}>
            <ListItemText className={classes.listItemText} secondary={"from " + props.userName + " at " + timeConverter(props.time)}></ListItemText>
        </Grid>
    </Grid>
    }
}

function BarrageList(props: BarrageListPropsType) {
    const classes = useStyles();
    const { barrage, focusRef } = props;
    return <BarrageItem
            uid={barrage.uid}
            content={barrage.content}
            time={barrage.time}
            NBImgUrl={barrage.NBImgUrl}
            NBTitle={barrage.NBTitle}
            NBcontent={barrage.NBcontent}
            tag={barrage.tag}
            userName={barrage.userName}
            focus={barrage.focus} 
            focusRef={focusRef} />
}

const BarrageBox = (props: BarrageBoxProps) => {
    const classes = useStyles();
    const scrollRef = useRef<HTMLUListElement>(null);
    const focusRef = useRef<HTMLDivElement>(null);
    const [scrollHeight, setScrollHeight] = useState<number>(0);
    const [scrollTop, setScrollTop] = useState<number>(0);
    const curHoverTimeStampAtom = useRecoilValue(BarrageHoverTimeStampAtom);
    const curBarrageFocusTimeRangeAtom = useRecoilValue(BarrageFocusTimeRangeAtom);
    const { barrageArray } = props;
    let sortedBarrageArray = [...barrageArray];

    sortedBarrageArray.sort((barrageA: Barrage, barrageB: Barrage) => {
        return barrageA.time - barrageB.time;
    });
    
    const [sortedBarrageArrayState, setSortedBarrageArrayState] = useState<BarrageItemWithFocus[]>(sortedBarrageArray.map((barrage) => { return { ...barrage, focus: false } }))

    const onScroll = () => {
        if (scrollRef.current == null) {
            return;
        }
    }
    useEffect(() => {
        let closestBarrageTimeArr: number[] = [];
        if (curHoverTimeStampAtom > 0 && barrageArray.length !== 0) {
            sortedBarrageArray.map((barrage) => {
                if (Math.abs(barrage.time - curHoverTimeStampAtom) < curBarrageFocusTimeRangeAtom * 60 * 1000) {
                    closestBarrageTimeArr.push(barrage.time)
                }
            })
            const focusArray: BarrageItemWithFocus[] = sortedBarrageArray.map((barrage) => {
                if (closestBarrageTimeArr.includes(barrage.time)) {

                    return { ...barrage, focus: true }
                } else {
                    return { ...barrage, focus: false }
                }
            }).sort((barrageA: BarrageItemWithFocus, barrageB: BarrageItemWithFocus) => {
                return barrageA.time - barrageB.time;
            });
            setSortedBarrageArrayState(focusArray);
            if (focusRef.current && scrollRef.current) {
                const element = focusRef.current;
                element.scrollIntoView({ behavior: "smooth", block: 'center' })
            }
        } else {
            if (scrollRef.current) {
                setScrollHeight(scrollRef.current.scrollHeight ?? 0);
                setScrollTop(scrollRef.current.scrollTop ?? 0);
                scrollRef.current.scrollTo({
                    top: scrollHeight - scrollRef.current.clientHeight,
                })
            }
            setSortedBarrageArrayState(sortedBarrageArray.map((barrage) => { return { ...barrage, focus: false } }));
        }

    }, [scrollRef, focusRef, barrageArray, scrollHeight, curHoverTimeStampAtom])
    return (
        <List className={classes.messageArea} ref={scrollRef} onScroll={onScroll}>
            {sortedBarrageArrayState.map((barrage: BarrageItemWithFocus, i: number) => {
                if (barrage.focus) {
                    return (
                        <ListItem key={i} >
                            <BarrageList barrage={barrage} focusRef={focusRef} />
                        </ListItem>)
                } else {
                    return (
                        <ListItem key={i}>
                            <BarrageList barrage={barrage} focusRef={null} />
                        </ListItem>)
                }

            })}
        </List>

    )
}


export function BarragePage() {
    const classes = useStyles();
    const [textContent, setTextContent] = useState('');
    const curUid = useRecoilValue(curUserUidAtom);
    const barragesAtom = useRecoilValue(BarrageSnapShotAtom);
    const [checked, setChecked] = useState(true);
    const { _ready, _barrages } = useBarrages();
    const sendBarrage = async () => {
        if (textContent.length === 0) {
            return;
        }
        const barrage = { uid: curUid, content: textContent, time: Date.now(), tag: '' };
        setTextContent('')
        await storeUserBarrage(barrage)
    }

    const handleEnter = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            await sendBarrage();
        }
    }

    useEffect(() => {
    }, [barragesAtom]);

    return (<div className={classes.page}>
        {curUid ?
            <div style={{ marginTop: '100px', display: 'inline-block', width: '100%' }} onKeyPress={async (event) => { handleEnter(event) }}>
                <Zoom in={checked} timeout={1000}>
                    <div className={classes.stockChart}>
                        <StockChart />
                    </div>
                </Zoom>
                <Fade in={checked} timeout={2000}>
                    <Grid container component={Paper} className={classes.chatSection} >
                        <Grid item xs={12}>
                            <BarrageBox barrageArray={barragesAtom} />
                            <Divider />
                            <Grid container className={classes.sendMessageArea}>
                                <Grid item xs={10}>
                                    <TextField id="outlined-basic-email" label="Type Barrage!" fullWidth value={textContent} onChange={(event) => { setTextContent(event.target.value) }} />
                                </Grid>
                                <Grid xs={1} >
                                    <div >
                                        <Button variant="outlined" color="primary" onClick={async () => { sendBarrage() }} style={{marginLeft:'4vh',marginTop:'0.8vh'}}>
                                            send
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Fade>
            </div> : <div style={{ marginTop: '100px' }}>u should log in first</div>}
    </div>
    );
}