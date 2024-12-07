import ListIcon from "@mui/icons-material/List";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";


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

  export default NAVIGATION;