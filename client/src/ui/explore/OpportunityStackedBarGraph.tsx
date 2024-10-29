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
    rejected: number,
    oa: number,
    interviewing: number,
    offered: number,
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
        label: "rejected",
        data: [rejected],
        backgroundColor: "red",
        borderRadius: {
          topLeft: 10,
          bottomLeft: 10,
        },
        borderSkipped: false,
      },
      {
        label: "OA",
        data: [oa],
        backgroundColor: "orange",
      },
      {
        label: "Interviewing",
        data: [interviewing],
        backgroundColor: "gold",
      },
      {
        label: "Offered",
        data: [offered],
        backgroundColor: "green",
        borderRadius: 10,
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
