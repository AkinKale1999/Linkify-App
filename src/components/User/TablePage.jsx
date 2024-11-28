import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import ViewTableButton from "../Buttons/ViewTableButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useDemoRouter } from "@toolpad/core/internal";
import ListIcon from "@mui/icons-material/List";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Liste from "../Liste/Liste";
import user_data from "../../assets/user_data.json";
import PropTypes from "prop-types";

function DataTable() {
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
        <Typography>Dashboard content for {pathname}</Typography>
      </Box>
    );
  }

  DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
  };

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

  const paginationModel = { page: 0, pageSize: 5 };

  let navigate = useNavigate();

  useEffect(() => {
    if (user_data.users.length === 0) {
      navigate("/Liste/create");
    } else {
      navigate("/Liste");
    }
  }, [user_data.users]);

  const router = useDemoRouter("/Liste");

  // Überprüfen und sichern, dass user_data.labelEigenschaften ein Array ist
  const columns = Array.isArray(user_data.labelEigenschaften)
    ? user_data.labelEigenschaften
    : []; // Fallback auf leeres Array, falls es kein Array ist

  console.log("Columns:", columns); // Überprüfen, was in columns übergeben wird

  return (
    <>
      <AppProvider
        session={session}
        authentication={authentication}
        navigation={NAVIGATION}
        theme={demoTheme}
      >
        <Liste
          mylist={user_data.users}
          mylabels={user_data.labelEigenschaften}
        />
        <DashboardLayout>
          <DemoPageContent pathname={router.pathname} />
          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={user_data.users}
              columns={columns} // Sicherstellen, dass columns ein Array ist
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </DashboardLayout>
      </AppProvider>
    </>
  );
}

export default DataTable;
