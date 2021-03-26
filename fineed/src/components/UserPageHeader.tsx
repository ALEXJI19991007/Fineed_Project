import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import UserHeader from "../imageSrc/profilepage/profileheader.png";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const imgCardStyle = makeStyles({
  card: {
    position: "relative",
  },
  loginCard: {
    position: "absolute",
  },
  sloganPos: {
    position: "absolute",
    left: "20px",
    bottom: "490px",
    color: "black",
    marginBottom: 100,
    fontFamily: "-apple-system",
  },
});

export function UserPageHeader(props: any) {
  const classes = imgCardStyle();

  const username =
    props.userInfo.username === "" ? "dear user" : props.userInfo.username;
  return (
    <Card elevation={0} style={{ height: "250px" }}>
      <CardMedia component="img" image={UserHeader} />
      <Typography variant="h3" className={classes.sloganPos}>
        Hi, {username}.
      </Typography>
    </Card>
  );
}
