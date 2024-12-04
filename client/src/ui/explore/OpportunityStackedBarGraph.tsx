"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface JobStats {
  rejected: number | null;
  oa: number | null;
  interviewing: number | null;
  offered: number | null;
  applied: number | null;
}

export function OpportunityStackedBarGraph({
  rejected,
  oa,
  interviewing,
  offered,
  applied,
}: JobStats) {
  const values = [
    applied ?? 0,
    rejected ?? 0,
    oa ?? 0,
    interviewing ?? 0,
    offered ?? 0,
  ];

  const total = values.reduce((acc, value) => acc + value, 0);

  const firstNonZeroIndex = values.findIndex((value) => value > 0);
  const lastNonZeroIndex =
    values.length - 1 - [...values].reverse().findIndex((value) => value > 0);

  const isSingleElement =
    firstNonZeroIndex === lastNonZeroIndex && firstNonZeroIndex !== -1;

  const data = {
    labels: ["Job Stats"],
    datasets: [
      {
        label: "Applied",
        data: [values[0]],
        backgroundColor: "#769FCD",
        borderRadius:
          isSingleElement && firstNonZeroIndex === 0
            ? { topLeft: 10, bottomLeft: 10, topRight: 10, bottomRight: 10 }
            : firstNonZeroIndex === 0
            ? { topLeft: 10, bottomLeft: 10 }
            : lastNonZeroIndex === 0
            ? { topRight: 10, bottomRight: 10 }
            : 0,
        borderSkipped: false,
      },
      {
        label: "Rejected",
        data: [values[1]],
        backgroundColor: "#C7253E",
        borderRadius:
          isSingleElement && firstNonZeroIndex === 1
            ? { topLeft: 10, bottomLeft: 10, topRight: 10, bottomRight: 10 }
            : firstNonZeroIndex === 1
            ? { topLeft: 10, bottomLeft: 10 }
            : lastNonZeroIndex === 1
            ? { topRight: 10, bottomRight: 10 }
            : 0,
        borderSkipped: false,
      },
      {
        label: "OA",
        data: [values[2]],
        backgroundColor: "#EB5B00",
        borderRadius:
          isSingleElement && firstNonZeroIndex === 2
            ? { topLeft: 10, bottomLeft: 10, topRight: 10, bottomRight: 10 }
            : firstNonZeroIndex === 2
            ? { topLeft: 10, bottomLeft: 10 }
            : lastNonZeroIndex === 2
            ? { topRight: 10, bottomRight: 10 }
            : 0,
        borderSkipped: false,
      },
      {
        label: "Interviewing",
        data: [values[3]],
        backgroundColor: "#F0A202",
        borderRadius:
          isSingleElement && firstNonZeroIndex === 3
            ? { topLeft: 10, bottomLeft: 10, topRight: 10, bottomRight: 10 }
            : firstNonZeroIndex === 3
            ? { topLeft: 10, bottomLeft: 10 }
            : lastNonZeroIndex === 3
            ? { topRight: 10, bottomRight: 10 }
            : 0,
        borderSkipped: false,
      },
      {
        label: "Offered",
        data: [values[4]],
        backgroundColor: "#2E7E33",
        borderRadius:
          isSingleElement && firstNonZeroIndex === 4
            ? { topLeft: 10, bottomLeft: 10, topRight: 10, bottomRight: 10 }
            : firstNonZeroIndex === 4
            ? { topLeft: 10, bottomLeft: 10 }
            : lastNonZeroIndex === 4
            ? { topRight: 10, bottomRight: 10 }
            : 0,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true, // Ensure the chart is responsive
    maintainAspectRatio: false, // Allow the chart to fill the container
    indexAxis: "y" as const,
    scales: {
      x: {
        stacked: true,
        display: false,
        grid: {
          display: false,
        },
        max: total,
      },
      y: {
        stacked: true,
        display: false,
        grid: {
          display: false,
        },
        
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false, // Hide dataset labels (legend)
      },
    },
  };

  return (
    <Bar
      style={{
        width: "100%",
      }}
      data={data}
      options={options}
    />
  );
}
