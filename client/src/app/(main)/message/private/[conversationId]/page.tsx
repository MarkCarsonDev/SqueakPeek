import React from "react";
import { Conversation } from "@/ui/message/Conversation";

// export const metadata = {
//   title: "Private Conversation - Chat with Applicants",
//   description:
//     "Engage in private conversations with other applicants, discuss experiences, and share insights.",
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
      }}
    >
      <Conversation conversationId={conversationId} isPrivateConversation />
    </div>
  );
}
