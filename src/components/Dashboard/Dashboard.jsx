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
import Arrow from "../Arrows/ArrowUpAndDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfilePage from "../User/ProfileEdit";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDemoRouter } from "@toolpad/core/internal";
import SignOutModal from "../Modula/ModulaLogout"

const NAVIGATION = [
  {
    segment: "Dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  { kind: "divider" },
  {
    segment: "Liste",
    title: "Liste",
    icon: <ListIcon />,
  },
  { kind: "divider" },
  {
    segment: "Profile",
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

  const [isSignOutModalOpen, setIsSignOutModalOpen] = React.useState(false);


  const openSignOutModal = () => setIsSignOutModalOpen(true);
  const closeSignOutModal = () => setIsSignOutModalOpen(false);

  const executeSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/logout";
  };
  // const { window } = props;
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
      signOut: () => {
        openSignOutModal()
      },
    };
  }, []);

  // const demoWindow = window !== undefined ? window() : undefined;

  const router = useDemoRouter("/Dashboard");

  return (
    <AppProvider
      router={router}
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
    // window={demoWindow}
    >
      <Arrow />
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
      <DashboardLayout sidebarExpandedWidth={250}>
        <DemoPageContent pathname={router.pathname} />
        {router.pathname === "/Liste" && <DataTable />}
        {router.pathname === "/Profile" && <ProfilePage />}
      </DashboardLayout>

      <SignOutModal open={isSignOutModalOpen} onClose={closeSignOutModal} onConfirm={executeSignOut} />
    </AppProvider>
  );
}

DashboardLayoutAccount.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutAccount;
