import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

function OverlapDataGrid({ data }) {
  const [gridHeight, setGridHeight] = useState(
    window.innerWidth > 1200 ? "600px" : "400px"
  );

  useEffect(() => {
    const handleResize = () => {
      setGridHeight(window.innerWidth > 1200 ? "600px" : "400px");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const etfColumns = Object.keys(data[0].etf_weights).map((ticker) => ({
    field: ticker,
    headerName: `${ticker} Weight`,
    width: 150,
    valueGetter: (params) => params.row.etf_weights[ticker]?.toFixed(2) + "%" || "",
  }));

  const columns = [
    { field: "ticker", headerName: "Stock Ticker", width: 150 },
    ...etfColumns,
    {
      field: "total_weight",
      headerName: "Total Weight",
      width: 150,
      renderCell: (params) => `${params.value.toFixed(2)}%`
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: gridHeight }}>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.ticker}
          pageSize={10}
        />
      </div>
    </div>
  );
}

export default OverlapDataGrid;
