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

interface jobStats {
    rejected: number | null,
    oa: number | null,
    interviewing: number | null,
    offered: number | null,
}
export function OpportunityStackedBarGraph({
    rejected,
    oa,
    interviewing,
    offered,
}:jobStats) {
  const data = {
    labels: ["Job Stats"],
    datasets: [
      {
        label: "Rejected",
        data: [rejected ?? 0], // Handle null values
        backgroundColor: "#C7253E",
        borderRadius: {
          topLeft: 10,
          bottomLeft: 10,
        },
        borderSkipped: false,
      },
      {
        label: "OA",
        data: [oa ?? 0], // Handle null values
        backgroundColor: "#EB5B00",
        borderRadius: {
          topRight: 10,
          bottomRight: 10,
        },
        borderSkipped: false,
      },
      {
        label: "Interviewing",
        data: [interviewing ?? 0], // Handle null values
        backgroundColor: "#F0A202",
        borderRadius: {
          topRight: 10,
          bottomRight: 10,
        },
        borderSkipped: false,
      },
      {
        label: "Offered",
        data: [offered ?? 0], // Handle null values
        backgroundColor: "#2E7E33",
        borderRadius: {
          topRight: 10,
          bottomRight: 10,
        },
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    scales: {
      x: {
        stacked: true,
        display: false,
        grid: {
          display: false,
        },
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
    maintainAspectRatio: false,
  };

  return <Bar data={data} options={options} />;
}
