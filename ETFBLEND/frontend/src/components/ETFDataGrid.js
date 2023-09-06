import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function ETFDataGrid({ data }) {
  const columns = [
    { field: "ticker", headerName: "Ticker", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "weight",
      headerName: "Weight",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            width: "100%",
            backgroundColor: "#f3f3f3",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: "#3f51b5", // You can choose any color
              width: params.value,
              height: "100%",
              position: "absolute",
            }}
          ></div>
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            {`${params.value}%`}
          </div>
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: (params) => (
        <div>
          {`$${params.value}`} {/* Render the price */}
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.ticker}
        pageSize={10}
      />
    </div>
  );
}

export default ETFDataGrid;
