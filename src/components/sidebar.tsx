"use client";

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Url } from "next/dist/shared/lib/router/router";
import Logout from "./Logout";
import { useRouter } from "next/navigation";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ChangeMode from "./DarkLightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;
// Breite der sidebar bei klick auf burgermenu

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));
type mini = {
  setIsSideBarOpen: any;
};

export default function MiniDrawer({ setIsSideBarOpen }: mini) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
    setIsSideBarOpen(true);
  };

  const handleNavigation = (path: Url) => {
    router.push(path);
  };

  const handleLogout = async () => {
    localStorage.clear();
    router.push("/");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setIsSideBarOpen(false);
  };

  const handleImageClick = () => {
    router.push("/customer");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>

          <div style={{ width: "150px", cursor: "pointer" }}>
            <img
              onClick={handleImageClick}
              src="\img\Linkify-Light.svg"
              alt="Linkify"
            />
          </div>

          <ChangeMode color="#fff" />
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* --------------------------------- */}
        <List sx={{ height: "100%" }} className="ListContainer">
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleLogout()}>
              <Logout />
              <ListItemText primary="Logout" style={{ marginLeft: "31px" }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation("/customer")}>
              <ListItemIcon className="DashboadAndTableIcon">
                <DashboardIcon style={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation("/customer/table")}>
              <ListItemIcon className="DashboadAndTableIcon">
                <FormatListBulletedIcon style={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="Table" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation("/customer/admin")}>
              <SupervisorAccountIcon>
                <FormatListBulletedIcon />
              </SupervisorAccountIcon>
              <ListItemText primary="Admin" style={{ marginLeft: "31px" }} />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <ListItemButton
              onClick={() => handleNavigation("/customer/profil")}
            >
              <AccountCircleIcon>
                <FormatListBulletedIcon />
              </AccountCircleIcon>
              <ListItemText primary="Profil" style={{ marginLeft: "31px" }} />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <ListItemButton
              onClick={() => handleNavigation("/customer/einstellungen")}
            >
              <SettingsIcon>
                <FormatListBulletedIcon />
              </SettingsIcon>
              <ListItemText
                primary="Einstellungen"
                style={{ marginLeft: "31px" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
