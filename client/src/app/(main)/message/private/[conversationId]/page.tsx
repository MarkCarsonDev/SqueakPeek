import React from "react";
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
      }}
    >
      <Conversation conversationId={conversationId} isPrivateConversation />
    </div>
  );
}
