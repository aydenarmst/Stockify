import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

function ETFDataGrid({ data }) {

  const [gridHeight, setGridHeight] = useState(window.innerWidth > 1200 ? '600px' : '400px');

  useEffect(() => {
    const handleResize = () => {
      setGridHeight(window.innerWidth > 1200 ? '600px' : '400px');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
              backgroundColor: "#003366",
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
          {`$${params.value}`}
        </div>
      ),
    },
    {
      field: "etf_count",
      headerName: "ETF Frequency",
      width: 150,
      renderCell: (params) => (
        <div>
          {`${params.value}`}
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: gridHeight, width: "100%" }}>
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
