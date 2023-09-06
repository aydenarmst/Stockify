import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, Label } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const renderCustomizedLabel = ({ percent }) => {
  return `${(percent * 100).toFixed(2)}%`;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
        <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
      </div>
    );
  }
  return null;
};

const SectorExposureChart = ({ data }) => {
  return (
    <PieChart width={500} height={300}>
      <Pie
        data={data}
        dataKey="weight"
        nameKey="sector"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label={renderCustomizedLabel}
      >
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
    </PieChart>
  );
};

export default SectorExposureChart;
