import React from "react";
import { OpportunityStats } from "@/ui/explore/OpportunityStats";
import { Conversation } from "@/ui/messaging/Conversation";
export default function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversationId } = params;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "70% 30%",
      }}
    >
      <Conversation conversationId={conversationId} />
      <OpportunityStats />
    </div>
  );
}
