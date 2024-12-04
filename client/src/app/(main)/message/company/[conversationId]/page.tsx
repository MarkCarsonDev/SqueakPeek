import React from "react";
import { OpportunityStats } from "@/ui/message/OpportunityStats";
import { Conversation } from "@/ui/message/Conversation";
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
      {/* Pass a random opportunity_id */}
      <OpportunityStats opportunity_id = "23d0e50d-6adc-4d70-b8cd-9ef651b479eb"/>
    </div>
  );
}
