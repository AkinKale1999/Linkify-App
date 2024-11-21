import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom"; // Importiere den Router-Navigate-Hook
import Successbutton from "./SuccessButton";
import ViewTableButton from "./ViewTableButton";
import BackButton from "./BackButton";

function DataTable() {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "firstName",
      headerName: "First name",
      width: 130,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 130,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      headerName: "Status",
      field: "status",
      width: 100,
      renderCell: (params) => <span>{params.value ? "True" : "False"}</span>,
    },
    {
      headerName: "Actions",
      field: "actions",
      width: 100,
      renderCell: (row) => <ViewTableButton id={row.id} />,
    },
  ];

  const rows = [
    {
      id: 1,
      lastName: "Lastname1",
      firstName: "FirstName1",
      age: 35,
      status: false,
    },
    {
      id: 2,
      lastName: "LastName2",
      firstName: "FirstName2",
      age: 42,
      status: false,
    },
    {
      id: 3,
      lastName: "LastName3",
      firstName: "FirstName3",
      age: 45,
      status: false,
    },
    {
      id: 4,
      lastName: "LastName4",
      firstName: "FirstName4",
      age: 16,
      status: false,
    },
    {
      id: 5,
      lastName: "LastName5",
      firstName: "FirstName5",
      age: 25,
      status: false,
    },
    {
      id: 6,
      lastName: "LastName6",
      firstName: "FirstName6",
      age: 150,
      status: false,
    },
    {
      id: 7,
      lastName: "LastName7",
      firstName: "FirstName7",
      age: 44,
      status: false,
    },
    {
      id: 8,
      lastName: "LastName8",
      firstName: "FirstName8",
      age: 36,
      status: false,
    },
    {
      id: 9,
      lastName: "LastName9",
      firstName: "FirstName9",
      age: 65,
      status: false,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
}

export default DataTable;
