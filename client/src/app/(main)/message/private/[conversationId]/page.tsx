"use client";
import React from "react";
import { Conversation } from "@/ui/message/Conversation";
import usePageHeader from "@/lib/hooks/usePageHeader"; // Import the custom hook

export default function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversationId } = params;

  // Set page title and meta description using the custom hook
  usePageHeader(
    "Private Conversation - Chat with Applicants",
    "Engage in private conversations with other applicants, discuss experiences, and share insights."
  );

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
