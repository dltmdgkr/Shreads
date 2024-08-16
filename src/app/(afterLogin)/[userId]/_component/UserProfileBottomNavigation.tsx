"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserPosts from "./UserPosts";
import UserComments from "./UserComments";

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
        <Box sx={{ p: 3 }}>
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

export default function UserProfileBottomNavigation({
  userId,
}: {
  userId: string;
}) {
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
            <Tab label="슈레드" {...a11yProps(0)} className="flex-1" />
            <Tab label="답글" {...a11yProps(1)} className="flex-1" />
            <Tab label="리포스트" {...a11yProps(2)} className="flex-1" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="max-w-[50vw]">
            <UserPosts userId={userId} />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <UserComments userId={userId} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          리포스트 ...
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
}
