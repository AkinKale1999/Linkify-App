"use client";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import ViewTableButton from "../buttons/viewtablebutton";
import { useState } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 160,
    renderCell: (params) => <ViewTableButton row={params.row} />,
  },
];

const rows = [];

const paginationModel = { page: 0, pageSize: 5 };
export default function CreatePage() {
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <Paper sx={{ height: 400, width: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
        onSelectionModelChange={(newSelection) =>
          setSelectedRow(newSelection.selectionModel[0])
        }
      />
      {selectedRow && <EditPage selectedRowId={selectedRow} />}
    </Paper>
  );
}