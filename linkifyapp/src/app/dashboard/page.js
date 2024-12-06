"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DataTable from "../tablepage/page";
import ListIcon from "@mui/icons-material/List";
import Arrow from "../components/arrows/ArrowUpAndDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfilePage from "../profiledit/page";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDemoRouter } from "@toolpad/core/internal";
import SignOutModal from "../components/modula/ModulaLogout";
import EditPage from "../editpage/page";
import "../../MyApp.css";

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

// eigene Komponente mache NAVIGATION

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
        openSignOutModal();
      },
    };
  }, []);

  // Verwendung eines States für die Ansichtsauswahl
  const [activePage, setActivePage] = useState("dashboard");

  const handleNavigationChange = (page) => {
    setActivePage(page);
  };

  const router = useDemoRouter("/dashboard");

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

        {/* Bedingte Anzeige der Seiten basierend auf dem State */}
        {activePage === "Liste" && <DataTable />}
        {activePage === "Profile" && <ProfilePage />}
        {activePage === "EditPage" && <EditPage />}

        {/* Navigation */}
        <Box>
          <button onClick={() => handleNavigationChange("Liste")}>
            Go to Liste
          </button>
          <button onClick={() => handleNavigationChange("Profile")}>
            Go to Profile
          </button>
          <button onClick={() => handleNavigationChange("EditPage")}>
            Go to EditPage
          </button>
        </Box>
      </DashboardLayout>

      <SignOutModal
        open={isSignOutModalOpen}
        onClose={closeSignOutModal}
        onConfirm={executeSignOut}
      />
    </AppProvider>
  );
}

DashboardLayoutAccount.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutAccount;
