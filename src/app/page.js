"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import DataTable from "./components/tablepage/tablepage";
import Arrow from "./components/arrows/ArrowUpAndDown";
import ProfilePage from "./components/profiledit/profiledit";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDemoRouter } from "@toolpad/core/internal";
import SignOutModal from "./components/modula/ModulaLogout";
import LightModeIcon from "@mui/icons-material/LightMode";
import EditPage from "./components/editpage/editpage";
import NAVIGATION from "./components/navigation/navigation";
import CreatePage from "./components/createpage/createpage";
import ProtectedRoute from "./components/protectedroute/protectedroute";

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
  const [activePage, setActivePage] = useState("Dashboard");
  const [session, setSession] = React.useState({
    user: {
      name: "",
      email: "",
      image: "",
    },
  });
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [dataRows, setDataRows] = useState([]); // Zustand für die Datenzeilen in DataTable

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

  const openSignOutModal = () => setIsSignOutModalOpen(true);
  const closeSignOutModal = () => setIsSignOutModalOpen(false);

  const executeSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/logout";
  };

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

  const router = useDemoRouter("/Dashboard");

  useEffect(() => {
    const path = router.pathname.split("/").pop();
    if (path === "Liste" || path === "Profile" || path === "EditPage") {
      setActivePage(path);
    }
  }, [router.pathname]);

  // Überprüfen, ob Zeilen in DataTable leer sind
  useEffect(() => {
    if (dataRows.length === 0) {
      setActivePage("CreatePage");
    }
  }, [dataRows]);

  return (
    <ProtectedRoute>
      <AppProvider
        router={router}
        session={session}
        authentication={authentication}
        branding={{
          logo: isDarkMode ? (
            <img id="LogoPath" src="/img/Linkify weiss2.svg" alt="Linkify" />
          ) : (
            <img
              id="LogoPath"
              src="/img/Linkify blau grau 2.svg"
              alt="Linkify"
            />
          ),
          title: "",
        }}
        theme={isDarkMode ? dark : light}
        navigation={NAVIGATION}
      >
        <Arrow isDarkMode={isDarkMode} />
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
          {activePage === "Liste" && router.pathname !== "/Dashboard" && (
            <DataTable setDataRows={setDataRows} />
          )}
          {activePage === "Profile" && router.pathname !== "/Dashboard" && (
            <ProfilePage />
          )}
          {activePage === "EditPage" && <EditPage />}

          {activePage === "CreatePage" && router.pathname !== "/Dashboard" && (
            <CreatePage />
          )}
        </DashboardLayout>

        <SignOutModal
          open={isSignOutModalOpen}
          onClose={closeSignOutModal}
          onConfirm={executeSignOut}
        />
      </AppProvider>
    </ProtectedRoute>
  );
}

DashboardLayoutAccount.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutAccount;
