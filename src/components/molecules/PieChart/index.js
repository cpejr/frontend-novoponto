import React from "react";
import {
  PieChart as PieChartRecharts,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Text,
} from "recharts";
import { CenterText, CustomToolTip } from "./styles";
import { mili2time } from "../../../utils/dateFunctions";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const time = mili2time(payload[0].value);

    return <CustomToolTip>{`${payload[0].name} :  ${time}`}</CustomToolTip>;
  }

  return null;
};

export default function PieChart({ data, colors }) {
  const totalHours = data.reduce((total, entry) => total + entry.value, 0);
  const formattedTotalHours = mili2time(totalHours);
  return (
    <PieChartRecharts width={180} height={120}>
      <text
        style={{ fontSize: "16px", fontWeight: "500" }}
        x="50%"
        y="50%"
        dy={8}
        textAnchor="middle"
        fill="white"
      >
        {formattedTotalHours}
      </text>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={27}
        outerRadius={58}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index]} strokeWidth={0} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChartRecharts>
  );
}

