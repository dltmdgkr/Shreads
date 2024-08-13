"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PostRecommends from "./PostRecommends";
import FollowingPosts from "./FollowingPosts";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
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
        <Box sx={{ p: 2 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
  },
});

export default function PostNavigation() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="flex w-full"
          >
            <Tab
              label="회원님을 위한 추천"
              {...a11yProps(0)}
              className="flex-1"
            />
            <Tab label="팔로잉" {...a11yProps(1)} className="flex-1" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <PostRecommends />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <FollowingPosts />
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
}
