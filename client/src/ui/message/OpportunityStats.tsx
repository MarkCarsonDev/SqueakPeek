"use client";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { FetchOpportunityStats } from "@/lib/utils/Application/FetchOpportunityStats";
import { Database } from "@/lib/types/database.types";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useFetchOpportunityFromConversation } from "@/lib/hooks/useFetchOpportunityFromConversation";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export function OpportunityStats({
  conversation_id,
}: {
  conversation_id: string;
}) {
  const [data, setData] = useState<
    Database["public"]["Tables"]["opportunity_tracking"]["Row"][]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { opportunityId: opportunity_id } =
    useFetchOpportunityFromConversation(conversation_id);

  useEffect(() => {
    async function fetchData() {
      if (opportunity_id) {
        setIsLoading(true);
        const { data, error } = await FetchOpportunityStats(opportunity_id);
        if (error) {
          setError(error);
        } else if (data) setData(data);

        setIsLoading(false);
      }
    }
    fetchData();
  }, [opportunity_id]);

  const totals = data.reduce(
    (acc, curr) => {
      acc.applied += curr.applied ?? 0;
      acc.rejected += curr.rejected ?? 0;
      acc.online_assessment += curr.online_assessment ?? 0;
      acc.interviewing += curr.interviewing ?? 0;
      acc.offer += curr.offer ?? 0;
      return acc;
    },
    {
      applied: 0,
      rejected: 0,
      online_assessment: 0,
      interviewing: 0,
      offer: 0,
    }
  );

  const chartData = {
    labels: ["Applied", "Rejected", "OA", "Interviewing", "Offered"],
    datasets: [
      {
        data: [
          totals.applied,
          totals.rejected,
          totals.online_assessment,
          totals.interviewing,
          totals.offer,
        ],
        backgroundColor: [
          "#779fcd",
          "#c7253e",
          "#eb5a02",
          "#ffbf63",
          "#2e7e33",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"pie">) => {
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: ${value}`;
          },
        },
      },
      datalabels: {
        color: "white",
        font: {
          weight: "bold",
          size: 20,
        },
        formatter: (value: number) => value,
      },
    },
  };

  if (isLoading) {
    return <div>Is Loading...</div>;
  } else if (error || !data) {
    return <div>Data unavailable</div>;
  } else if (data.length === 0) {
    return <div>No One has applied yet</div>;
  } else {
    return (
      <div style={{ borderLeft: "3px solid #E0E4F2" }}>
        <Typography style={{ padding: "30px 0px 30px 30px" }} variant="h3">
          Stats
        </Typography>
        <Pie data={chartData} options={options} height={175} />
      </div>
    );
  }
}
