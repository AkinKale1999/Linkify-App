import React, { useState, useEffect } from "react";
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

const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "liste",
    title: "Liste",
    icon: <ListIcon />,
  },
];

const COMPONENTS = {
  liste: DataTable,
};

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

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
        localStorage.removeItem("Auth");
        navigate("/logout");
      },
    };
  }, []);

  const [activePage, setActivePage] = React.useState("dashboard");

  const demoWindow = window !== undefined ? window() : undefined;

  const handleNavigationClick = (segment) => {
    setActivePage(segment);
  };

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      branding={{
        logo: (
          <img id="LogoPath" src="/img/Linkify blau grau 2.svg" alt="Linkify" />
        ),
        title: "",
      }}
      navigation={NAVIGATION}
      theme={demoTheme}
      window={demoWindow}
    >
      <Arrow />
      <DashboardLayout sidebarExpandedWidth={250}>
        {NAVIGATION.map((item, index) => (
          <Typography
            key={index}
            onClick={() => handleNavigationClick(item.segment)}
            sx={{ cursor: "pointer", color: "blue" }}
          >
            {item.title}
          </Typography>
        ))}

        {COMPONENTS[activePage] ? (
          React.createElement(COMPONENTS[activePage], {
            pathname: activePage,
          })
        ) : (
          <DemoPageContent pathname={activePage} />
        )}
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutAccount.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutAccount;
