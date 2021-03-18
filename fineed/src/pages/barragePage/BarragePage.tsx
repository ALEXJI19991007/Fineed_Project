import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
import { curUserUidAtom } from '../../atoms/FirebaseUserAtom'
import { useRecoilState, useRecoilValue } from "recoil";
import { storeUserBarrage } from "../../firebase/FirebaseFunction";
import { useBarrages } from "../../firebase/FirebaseFireStore";
import { Barrage, BarrageSnapShotAtom } from "../../atoms/BarrageSnapShotAtom";
import { StockChart } from "./StockChart";
import { BarrageHoverTimeStampAtom } from "../../atoms/BarrageHoverTimeStampAtom";


const useStyles = makeStyles({
    table: {
        float: 'left',
        marginTop: '1000px'
    },
    index: {
        height: '500px',
        width: '600px',
        float: 'left',
        marginRight: '100px'
    },
    chatSection: {
        width: '50%',
        float: 'left'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    },
    listItemText: {
        align: 'right',
    }
});

function timeConverter(UNIX_timestamp: number): string {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}
type BarrageItemProps = {
    barrageArray: Barrage[],
}

type BarrageItemWithFocus = {
    uid: string,
    content: string,
    time: number,
    tag: string,
    focus: boolean,
}

type isInTheViewParaType = {
    elementClientHeight: number,
    elementOffsetTop: number,
    containerClientHeight: number,
    containerScrollTop: number,
}

const BarrageItem = (props: BarrageItemProps) => {
    const classes = useStyles();
    const scrollRef = useRef<HTMLUListElement>(null);
    const focusRef = useRef<HTMLDivElement>(null);
    const [scrollHeight, setScrollHeight] = useState<number>(0);
    const [scrollTop, setScrollTop] = useState<number>(0);
    const curHoverTimeStampAtom = useRecoilValue(BarrageHoverTimeStampAtom);
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
    const isInTheView = (IsOverFlowItem: isInTheViewParaType, partial: boolean) => {
        const { elementClientHeight, elementOffsetTop, containerClientHeight, containerScrollTop } = IsOverFlowItem
        const cTop = containerScrollTop;
        const cBottom = cTop + containerClientHeight;
        const eTop = elementOffsetTop;
        const eBottom = eTop + elementClientHeight;
        let isTotal = (eTop >= cTop && eBottom <= cBottom);
        let isPartial = partial && (
            (eTop < cTop && eBottom > cTop) ||
            (eBottom > cBottom && eTop < cBottom)
        );

        return (isTotal || isPartial);
    }

    useEffect(() => {
        if (curHoverTimeStampAtom > 0) {
            let closestTime = sortedBarrageArray.sort((a, b) => Math.abs(curHoverTimeStampAtom - a.time) - Math.abs(curHoverTimeStampAtom - b.time))[0].time;
            const focusArray: BarrageItemWithFocus[] = sortedBarrageArray.map((barrage) => {
                if (barrage.time === closestTime) {
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
                const container = scrollRef.current;
                element.scrollIntoView({behavior: "smooth"})
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
            {sortedBarrageArrayState.map((barrage: BarrageItemWithFocus, i: number) => (<ListItem key={i}>
                {barrage.focus ? (
                    <Grid container style={{ backgroundColor: '#81d4fa', borderRadius: 7, paddingRight: '10px', paddingLeft: '10px' }} ref={focusRef}>
                        <Grid item xs={12}>
                            <ListItemText className={classes.listItemText} primary={barrage.content}></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText className={classes.listItemText} secondary={timeConverter(barrage.time)}></ListItemText>
                        </Grid>
                    </Grid>) :
                    (<Grid container>
                        <Grid item xs={12}>
                            <ListItemText className={classes.listItemText} primary={barrage.content}></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText className={classes.listItemText} secondary={timeConverter(barrage.time)}></ListItemText>
                        </Grid>
                    </Grid>)
                }
            </ListItem>))}
        </List>

    )
}

export function BarragePage() {
    const classes = useStyles();
    const [textContent, setTextContent] = useState('');
    const curUid = useRecoilValue(curUserUidAtom);
    const barragesAtom = useRecoilValue(BarrageSnapShotAtom);
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

    return (curUid ?
        <div style={{ marginTop: '100px', display: 'inline-block', width: '100%' }} onKeyPress={async (event) => { handleEnter(event) }}>
            <div className={classes.index}><StockChart /></div>

            <Grid container component={Paper} className={classes.chatSection} >
                <Grid item xs={9}>
                    <BarrageItem barrageArray={barragesAtom} />
                    <Divider />
                    <Grid container>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth value={textContent} onChange={(event) => { setTextContent(event.target.value) }} />
                        </Grid>
                        <Grid xs={1} className={classes.listItemText}>
                            <Fab color="primary" aria-label="add" onClick={async () => { sendBarrage() }}><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </div> : <div style={{ marginTop: '100px' }}>u should log in first</div>
    );
}