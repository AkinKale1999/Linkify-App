import DashboardIcon from "@mui/icons-material/Dashboard";

export const NAVIGATION = [
  {
    segment: "liste",
    title: "Liste",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
];

export const COMPONENTS = {
  dashboard: DashboardLayoutAccount,
  liste: DataTable,
};
