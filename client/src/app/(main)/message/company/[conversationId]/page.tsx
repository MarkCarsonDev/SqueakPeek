"use client";
import React, { useEffect } from "react";
import { OpportunityStats } from "@/ui/message/OpportunityStats";
import { Conversation } from "@/ui/message/Conversation";
import usePageHeader from "@/lib/hooks/usePageHeader"; // Import the custom hook

export default function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversationId } = params;

  // Set page title and meta description
  usePageHeader(
    "Company Conversation - Engage in Discussions",
    "Participate in company-specific conversations, share insights, and connect with other applicants in this thread."
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "70% 30%",
      }}
    >
      <Conversation conversationId={conversationId} />
      {/* Pass a random opportunity_id */}
      <OpportunityStats conversation_id={conversationId}/>
    </div>
  );
}
