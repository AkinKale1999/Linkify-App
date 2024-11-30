import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { NAVIGATION, COMPONENTS } from "../Navigation/NavigationMenu";

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
      navigation={NAVIGATION}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <Box>
          {NAVIGATION.map((item, index) => {
            return (
              <Typography
                key={index}
                onClick={() => handleNavigationClick(item.segment)}
                sx={{ cursor: "pointer", color: "blue" }}
              >
                {item.title}
              </Typography>
            );
          })}
        </Box>

        {COMPONENTS[activePage] ? (
          React.createElement(COMPONENTS[activePage], { pathname: activePage })
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
