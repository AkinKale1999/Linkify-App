import React, { useState, useEffect, Children } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DataTable from "../User/TablePage";
import ListIcon from "@mui/icons-material/List";
import { useNavigate } from "react-router-dom";
import Arrow from "../Arrows/ArrowUpAndDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfilePage from "../User/ProfileEdit";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  { kind: "divider" },
  {
    segment: "liste",
    title: "Liste",
    icon: <ListIcon />,
  },
  { kind: "divider" },
  {
    segment: "dashboard",
    title: "Profile",
    icon: <AccountCircleIcon />,
  },
];

const COMPONENTS = {
  liste: DataTable,
  Profile: ProfilePage,
};

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutAccount(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [session, setSession] = React.useState({
    user: {
      name: "",
      email: "",
      image: "",
    },
  });

  const light = createTheme({
    palette: {
      mode: "light",
    },
  });

  const dark = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "",
            email: "",
            image: "",
          },
        });
      },
      signOut: () => {
        setSession(null);
        localStorage.clear();
        sessionStorage.clear();
        navigate("/logout");
      },
    };
  }, []);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      branding={{
        logo: isDarkMode ? (
          <img id="LogoPath" src="/img/Linkify weiss2.svg" alt="Linkify" />
        ) : (
          <img id="LogoPath" src="/img/Linkify blau grau 2.svg" alt="Linkify" />
        ),
        title: "",
      }}
      theme={isDarkMode ? dark : light}
      navigation={NAVIGATION}
      window={demoWindow}
    >
      <Arrow id="ArrowBTN"/>
      <LightModeIcon
        id="LightMode"
        onClick={toggleTheme}
        sx={{ cursor: "pointer", display: isDarkMode ? "none" : "block" }}
      />
      <DarkModeIcon
        id="DarkMode"
        onClick={toggleTheme}
        sx={{ cursor: "pointer", display: isDarkMode ? "block" : "none" }}
      />
      <DashboardLayout sidebarExpandedWidth={250}></DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutAccount.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutAccount;
