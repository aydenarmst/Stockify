import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  Label,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#FF512F", // Red
  "#F09819", // Orange
  "#003366", // Dark Blue
  "#000", // Black
  "#FF7F50", // Coral
  "#FFA500", // Orange
  "#4169E1", // Royal Blue
  "#1E90FF", // Dodger Blue
  "#8B008B", // Dark Magenta
  "#800080", // Purple
];

const renderCustomizedLabel = ({ percent }) => {
  return `${(percent * 100).toFixed(2)}%`;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          border: "1px solid #ccc",
          fontFamily: "Lato, sans-serif",
        }}
      >
        <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
      </div>
    );
  }
  return null;
};

const SectorExposureChart = ({ data }) => {
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
        <PieChart>
          <Pie
            data={data}
            dataKey="weight"
            nameKey="sector"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={renderCustomizedLabel}
            labelStyle={{ fontFamily: "Lato, sans-serif" }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontFamily: "Lato, sans-serif" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SectorExposureChart;
