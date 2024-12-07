"use client"
import React from "react";
import { OpportunityStats } from "@/ui/message/OpportunityStats";
import { Conversation } from "@/ui/message/Conversation";
import { useEffect } from "react";
export default function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversationId } = params;

  useEffect(() => {
    // Dynamically setting title and description
    document.title = "Company Conversation - Engage in Discussions";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Participate in company-specific conversations, share insights, and connect with other applicants in this thread."
      );
    }
  }, []);

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
