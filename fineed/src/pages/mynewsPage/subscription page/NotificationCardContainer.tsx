import React, { useState } from "react";
import { List } from "immutable";
import { NotificationCard } from "../../../components/NotificationCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useRecoilValueLoadable } from "recoil";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grow from "@material-ui/core/Grow";
import { SubsNotificationSelector } from "../../../selectors/SubscriptionNotificationSelector";

type SubsNotification = {
  company: string;
  updateNumber: number;
};

type NotificationCardContainerProps = {
  subsList: string[];
  subsNotifications: Map<string, number>;
};

//simualte the backend existed data
function NotificationList(props: NotificationCardContainerProps): List<SubsNotification> {
  const arr: any = [];
  props.subsList.forEach((company: string) => {
    const updateNumber = props.subsNotifications.get(company) || 0;
    if (updateNumber > 0) {
        let oneNotification = {
          company: company,
          updateNumber: updateNumber,
        };
        arr.push(oneNotification);
    }
  });
  const data = List<SubsNotification>(arr);
  return data;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      justify: "center",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    loadingCard: {
      maxWidth: 280,
      margin: theme.spacing(2),
    },
    loadingCardMedia: {
      height: 170,
    },
    backgroundCardImg: {
      top: 0,
      bottom: 0,
      position: "fixed",
      zIndex: 0,
    },
  })
);

function NotificationCardLoading() {
  const classes = useStyles();
  return (
    <Card className={classes.loadingCard}>
      {
        <Skeleton
          animation="wave"
          variant="rect"
          className={classes.loadingCardMedia}
        />
      }
      <CardContent>
        {
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={20} width="80%" />
          </React.Fragment>
        }
      </CardContent>
    </Card>
  );
}

function NotificationCardGridLoading() {
  const classes = useStyles();
  const [checked] = useState(true);
  //generate 8 loading card to demo on the screen.
  const loadingList = [1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        {loadingList.map((_notification: number, index: number) => {
          return (
            <Grid item xs={3} key={index}>
              <Grow in={checked} timeout={1200}>
                <div className={classes.paper}>
                  <NotificationCardLoading />
                </div>
              </Grow>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

type NotificationCardGridProps = {
    notificationList: List<SubsNotification>
}

function NotificationCardGrid(props: NotificationCardGridProps) {
  const classes = useStyles();
  const [checked] = useState(true);
  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        {props.notificationList.map((notification: SubsNotification, index: number) => {
          return (
            <Grid item xs={3} key={index}>
              <Grow in={checked} timeout={500}>
                <div className={classes.paper}>
                  <NotificationCard company={notification.company} updateNumber={notification.updateNumber}/>
                </div>
              </Grow>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export const NotificationCardContainer = () => {
  const notificationsLoadable = useRecoilValueLoadable(
    SubsNotificationSelector
  );

  switch (notificationsLoadable.state) {
    case "hasValue":
      const mNotifications = notificationsLoadable.contents;
      return (
        <>
          <div>
            <NotificationCardGrid notificationList={NotificationList(mNotifications)} />
          </div>
        </>
      );
    case "hasError":
      return <div>damn...</div>;
    case "loading":
      return (
        <div >
          <NotificationCardGridLoading />
        </div>
      );
  }
  
};