import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import useDarkMode from "../hooks/useDarkMode";

function PieCharts({ confirmedStays }: any) {
  const startDataLight = [
    {
      duration: "1 night",
      value: 0,
      color: "#ef4444",
    },
    {
      duration: "2 nights",
      value: 0,
      color: "#f97316",
    },
    {
      duration: "3 nights",
      value: 0,
      color: "#eab308",
    },
    {
      duration: "4-5 nights",
      value: 0,
      color: "#84cc16",
    },
    {
      duration: "6-7 nights",
      value: 0,
      color: "#22c55e",
    },
    {
      duration: "8-14 nights",
      value: 0,
      color: "#14b8a6",
    },
    {
      duration: "15-21 nights",
      value: 0,
      color: "#3b82f6",
    },
    {
      duration: "21+ nights",
      value: 0,
      color: "#a855f7",
    },
  ];

  const startDataDark = [
    {
      duration: "1 night",
      value: 0,
      color: "#b91c1c",
    },
    {
      duration: "2 nights",
      value: 0,
      color: "#c2410c",
    },
    {
      duration: "3 nights",
      value: 0,
      color: "#a16207",
    },
    {
      duration: "4-5 nights",
      value: 0,
      color: "#4d7c0f",
    },
    {
      duration: "6-7 nights",
      value: 0,
      color: "#15803d",
    },
    {
      duration: "8-14 nights",
      value: 0,
      color: "#0f766e",
    },
    {
      duration: "15-21 nights",
      value: 0,
      color: "#1d4ed8",
    },
    {
      duration: "21+ nights",
      value: 0,
      color: "#7e22ce",
    },
  ];

  function prepareData(startData: any, stays: any) {
    function incArrayValue(arr: any, field: string) {
      return arr.map((obj: any) =>
        obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
      );
    }

    const data = stays
      ?.reduce((arr: any, cur: any) => {
        const num = cur.numNights;
        if (num === 1) return incArrayValue(arr, "1 night");
        if (num === 2) return incArrayValue(arr, "2 nights");
        if (num === 3) return incArrayValue(arr, "3 nights");
        if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
        if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
        if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
        if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
        if (num >= 21) return incArrayValue(arr, "21+ nights");
        return arr;
      }, startData)
      .filter((obj: any) => obj.value > 0);

    return data;
  }
  const { isDark }: any = useDarkMode();
  const startData = isDark ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <section className="text-sm  ">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data?.map((entry: any) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width={100}
            layout="vertical"
            iconSize={10}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}

export default PieCharts;
