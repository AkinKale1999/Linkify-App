import * as React from "react";
import PropTypes, { func } from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import ListIcon from "@mui/icons-material/List";
import { useNavigate } from "react-router-dom";

const NAVIGATION = [
  {
    segment: "Dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "Liste",
    title: "Liste",
    icon: <ListIcon />,
  },
];

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
  const userEmail = sessionStorage.getItem("userEmail") || "Gast";

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
      <Typography>Willkommen, {userEmail}</Typography>
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutAccount() {
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
        localStorage.removeItem("isAuthenticated");
        navigate("/Logout");
        setSession(null);
      },
    };
  }, []);

  const router = useDemoRouter("/Dashboard");

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      theme={demoTheme}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutAccount.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutAccount;
