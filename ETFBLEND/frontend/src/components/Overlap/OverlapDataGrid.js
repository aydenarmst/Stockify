import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { throttle } from "../throttle";

function OverlapDataGrid({ data }) {
  const [gridHeight, setGridHeight] = useState(
    window.innerWidth > 1200 ? "600px" : "400px"
  );

  useEffect(() => {
    const handleResize = throttle(() => {
      setGridHeight(window.innerWidth > 1200 ? "600px" : "400px");
    }, 250); // throttled to update at most every 250ms

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const etfColumns = Object.keys(data[0].etf_weights).map((ticker) => ({
    field: ticker,
    headerName: `${ticker} Weight`,
    width: 150,
    valueGetter: (params) =>
      params.row.etf_weights[ticker]?.toFixed(2) + "%" || "",
  }));

  const columns = [
    { field: "ticker", headerName: "Stock Ticker", width: 150 },
    ...etfColumns,
    {
      field: "total_weight",
      headerName: "Total Weight",
      width: 150,
      valueGetter: (params) => params.row.total_weight?.toFixed(2) + "%" || "",
    },
  ];

  return (
    <div className="grid-container">
      <div style={{ width: "100%", height: "100%" }}>
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
