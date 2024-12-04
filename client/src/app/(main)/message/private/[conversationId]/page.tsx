"use client"
import React from "react";
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
    document.title = "Private Conversation - Chat with Applicants";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Engage in private conversations with other applicants, discuss experiences, and share insights."
      );
    }
  }, []);

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
