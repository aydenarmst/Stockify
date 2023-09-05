import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function ETFDataGrid({ data }) {
  // Define columns for your DataGrid


  const columns = [
    { field: "ticker", headerName: "Ticker", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "weight", headerName: "Weight", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data} 
        columns={columns}
        getRowId={(row) => row.ticker}
        pageSize={10} />
    </div>
  );
}

export default ETFDataGrid;
