import React from "react";
import {
  makeStyles,
  Theme,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { HistoryPage } from "./history & favorite page/HistoryPage";
import { FavoritePage } from "./history & favorite page/FavoritePage";

const thm = createMuiTheme({
  palette: {
    primary: { main: "#00DC16" },
    secondary: { main: "#ffff" },
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function MyNewsTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={thm}>
        <AppBar position="static" color="secondary" elevation={0}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Your History" {...a11yProps(0)} />
            <Tab label="Your Favorite" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <HistoryPage />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FavoritePage />
        </TabPanel>
      </ThemeProvider>
    </div>
  );
}
