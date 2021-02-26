import React from "react";
import { useRecoilState } from "recoil";
import * as Atoms from "../../atoms/NewsListFilterAtom";
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  })
);

export const NewsListFilter = () => {
  const classes = useStyles();
  const [filter, setFilter] = useRecoilState(Atoms.newsListFilterState);

  const updateSourceFilter = (e: React.ChangeEvent<{ value: unknown }>) => {
    const currentNewsState = {
      target: e.target.value as string,
      param: filter.param,
    };
    setFilter(currentNewsState);
  };

  return filter.target === "user_history" ? null : (
    <div>
      <FormControl className={classes.margin}>
        <InputLabel id="news-source-input-label">Source</InputLabel>
        <Select
          labelId="news-source-input-label"
          id="news-source-input"
          value={filter.target}
          onChange={updateSourceFilter}
          input={<BootstrapInput />}
        >
          <MenuItem value="bing">Bing</MenuItem>
          <MenuItem value="google">Google</MenuItem>
          <MenuItem value="yahoo">Yahoo</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
