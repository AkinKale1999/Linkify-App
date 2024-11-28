import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import ListIcon from "@mui/icons-material/List";
import EditIcon from "@mui/icons-material/Edit"; // für Bearbeiten
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
  {
    segment: "Profilseite",
    title: "Profil bearbeiten", // Besserer Titel für UX
    icon: <EditIcon />,
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

function DemoPageContent({ pathname, userEmail }) {
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
  userEmail: PropTypes.string.isRequired,
};

function DashboardLayoutAccount() {
  const navigate = useNavigate();

  const [session, setSession] = React.useState({
    user: {
      name: "",
      email: sessionStorage.getItem("Username") || "", // E-Mail aus sessionStorage holen
      image: "",
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: (user) => {
        setSession({
          user: {
            name: user.name,
            email: user.email,
            image: user.image,
          },
        });
        sessionStorage.setItem("Username", user.email); // E-Mail speichern
      },
      signOut: () => {
        localStorage.removeItem("isAuthenticated");
        navigate("/Logout");
        setSession(null);
        sessionStorage.removeItem("Username");
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
        <DemoPageContent
          pathname={router.pathname}
          userEmail={session.user.email} // E-Mail dynamisch übergeben
        />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutAccount.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutAccount;
