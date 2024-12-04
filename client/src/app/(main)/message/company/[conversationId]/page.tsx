import React from "react";
import { OpportunityStats } from "@/ui/message/OpportunityStats";
import { Conversation } from "@/ui/message/Conversation";
export default function Page({
  params,
}: {
  params: { conversationId: string, opportunity_id: string };
}) {
  const { conversationId, opportunity_id } = params;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "70% 30%",
      }}
    >
      <Conversation conversationId={conversationId} />
      {/* TODO: NEED ACTUAL A WAY TO PASS IN THE opportunity_id */}
      <OpportunityStats opportunity_id={opportunity_id} />
    </div>
  );
}
