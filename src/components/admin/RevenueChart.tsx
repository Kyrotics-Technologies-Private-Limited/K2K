import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartOptions,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const RevenueChart = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const yearlyData: Record<string, number[]> = {
    "2019": [5000, 2000, 3000],
    "2020": [10000, 4000, 6000],
    "2021": [15000, 6000, 9000],
    "2022": [20000, 8000, 12000],
    "2023": [25000, 10000, 15000],
    "2024": [30000, 12000, 18000],
  };

  const data = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Revenue",
        data: yearlyData[selectedYear].map((val) => val * 1.5),
        borderColor: "green",
        fill: false,
      },
      {
        label: "Expenses",
        data: yearlyData[selectedYear].map((val) => val * 0.7),
        borderColor: "red",
        fill: false,
      },
      {
        label: "Earnings",
        data: yearlyData[selectedYear],
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: {
        ticks: { color: "#555" },
      },
      y: {
        ticks: { color: "#555" },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Revenue, Expenses & Earnings</h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1"
        >
          {Object.keys(yearlyData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
