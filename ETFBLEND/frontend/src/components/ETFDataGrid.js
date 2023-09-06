import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function ETFDataGrid({ data }) {
  const columns = [
    { field: "ticker", headerName: "Ticker", width: 150 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "sector", headerName: "Sector", width: 150},
    {
      field: "weight",
      headerName: "Weight",
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            width: 150,
            backgroundColor: "#d9d9d9",
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
      width: 150,
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
