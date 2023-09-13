// BarGraph.js
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function BarGraph({ data }) {
  const processedData = data.reduce((acc, holding) => {
    const location = holding.location;
    if (acc[location]) {
      acc[location]++;
    } else {
      acc[location] = 1;
    }
    return acc;
  }, {});

  const dataArray = Object.keys(processedData).map((key) => ({
    location: key,
    count: processedData[key],
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "450px",
        maxWidth: "500px",
        margin: "0 auto",
        fontFamily: "Lato, sans-serif",
      }}
    >
      <ResponsiveContainer>
        <BarChart width={600} height={300} data={dataArray}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="location" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#003366" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarGraph;
