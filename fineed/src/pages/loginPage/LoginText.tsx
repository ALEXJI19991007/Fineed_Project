import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = makeStyles({
  txt: {
    paddingTop: "150px",
    textAligh: "center",
    fontFamily: "-apple-system",
  },
});
export function LoginText() {
  const classes = styles();
  return (
    <div>
      <Typography variant="h2" gutterBottom className={classes.txt}>
        Feed the financial news you are most interested in
      </Typography>
    </div>
  );
}
