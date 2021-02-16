import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { NaviDrawerOpenStateAtom } from '../atoms/NaviAtom'
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export function NaviDrawer() {
  const classes = useStyles();

  const [naviDrawerOpenState, setNaviDrawerOpenState] = useRecoilState(
    NaviDrawerOpenStateAtom,
  );

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={()=>{setNaviDrawerOpenState(false)}}
      onKeyDown={()=>{setNaviDrawerOpenState(false)}}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      
          <SwipeableDrawer
            anchor='left'
            open={naviDrawerOpenState}
            onClose={()=>{setNaviDrawerOpenState(false)}}
            onOpen={()=>{}}
          >
            {list('left')}
          </SwipeableDrawer>
      
    </div>
  );
}