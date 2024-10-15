import { randomUUID } from "crypto";
import { MessageBodyProps } from "./MessageCard";

interface ConversationBodyProps {
  conversationId: string;
}

/**
 * This is a UI container that holds all messages for a particular conversation
 * Also allows to send messages to that particular conversation
 */
import { MessageCard } from "./MessageCard";
export function ConversationBody({ conversationId }: ConversationBodyProps) {
  // TODO: Remove this when fetching from zustand store
  const messages: MessageBodyProps[] = [
    {
      avatar: "avatar1",
      sender_username: "Bropharah",
      timestamp: new Date(),
      message: "Hi There!",
      upVotes: 0,
      downVotes: 0,
      messageId: randomUUID(),
    },
    {
      avatar: "avatar1",
      sender_username: "Bropharah",
      timestamp: new Date(),
      message: "Hi There!",
      upVotes: 0,
      downVotes: 0,
      messageId: randomUUID(),
    },
    {
      avatar: "avatar1",
      sender_username: "Bropharah",
      timestamp: new Date(),
      message: "Hi There!",
      upVotes: 0,
      downVotes: 0,
      messageId: randomUUID(),
    },
    {
      avatar: "avatar1",
      sender_username: "Bropharah",
      timestamp: new Date(),
      message: "Hi There!",
      upVotes: 0,
      downVotes: 0,
      messageId: randomUUID(),
    },
    {
      avatar: "avatar1",
      sender_username: "Bropharah",
      timestamp: new Date(),
      message: "Hi There!",
      upVotes: 0,
      downVotes: 0,
      messageId: randomUUID(),
    },
    {
      avatar: "avatar1",
      sender_username: "Bropharah",
      timestamp: new Date(),
      message: "Hi There!",
      upVotes: 0,
      downVotes: 0,
      messageId: randomUUID(),
    },
  ];
  return messages.map((message) => (
    <MessageCard key={message.messageId} {...message} />
  ));
}
