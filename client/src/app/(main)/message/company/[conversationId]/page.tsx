import React from "react";
import { OpportunityStats } from "@/ui/message/OpportunityStats";
import { Conversation } from "@/ui/message/Conversation";

// export const metadata = {
//   title: "Company Conversation - Chat with Employers",
//   description:
//     "Engage in private conversations with employers, discuss opportunities, and share insights.",
// };

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
      <OpportunityStats conversation_id={conversationId}/>
    </div>
  );
}
