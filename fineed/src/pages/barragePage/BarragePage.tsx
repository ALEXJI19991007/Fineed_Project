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
import { useRecoilValue } from "recoil";
import { storeUserBarrage } from "../../firebase/FirebaseFunction";
import { useBarrages } from "../../firebase/FirebaseFireStore";
import { Barrage, BarrageSnapShotAtom } from "../../atoms/BarrageSnapShotAtom";

const SCROLLHEIGHTANDTOPOFFSET = 745;


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
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
    barrageArray: Barrage[]
}

const BarrageItem = (props: BarrageItemProps) => {
    const classes = useStyles();
    const scrollRef = useRef<HTMLUListElement>(null);
    const [scrollHeight,setScrollHeight] = useState<number>(0);
    const [scrollTop,setScrollTop] = useState<number>(0);
    const { barrageArray } = props;
    let sortedBarrageArray = [...barrageArray];
    
    sortedBarrageArray.sort((barrageA:Barrage, barrageB:Barrage) => {
        return barrageA.time - barrageB.time;
    });
    const onScroll =() =>{
        if(scrollRef.current == null){
            return;
        }
    }
    useEffect(()=>{
        setScrollHeight(scrollRef.current?.scrollHeight??0);
        setScrollTop(scrollRef.current?.scrollTop??0);
        if(scrollRef.current){
            scrollRef.current.scrollTo({
                top: scrollHeight-SCROLLHEIGHTANDTOPOFFSET,
            })
        }
    },[scrollRef,barrageArray])
    return (
        <List className={classes.messageArea} ref={scrollRef} onScroll={onScroll}>
            {sortedBarrageArray.map((barrage:Barrage, i:number) => (<ListItem key={i}>
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText className={classes.listItemText} primary={barrage.content}></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItemText className={classes.listItemText} secondary={timeConverter(barrage.time)}></ListItemText>
                    </Grid>
                </Grid>
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
        const barrage = { uid: curUid, content: textContent, time: Date.now(), tag: '' };
        setTextContent('')
        await storeUserBarrage(barrage)
    }

    useEffect(() => {
        
    }, [barragesAtom]);

    return (curUid ?
        <div style={{ marginTop: '100px' }}>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={9}>
                    <BarrageItem barrageArray={barragesAtom} />
                    <Divider />
                    <Grid container style={{ padding: '20px' }}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth value={textContent} onChange={(event) => { setTextContent(event.target.value) }} />
                        </Grid>
                        <Grid xs={1} className={classes.listItemText}>
                            <Fab color="primary" aria-label="add" onClick={async()=>{sendBarrage()}}><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div> : <div style={{ marginTop: '100px' }}>u should log in first</div>
    );
}