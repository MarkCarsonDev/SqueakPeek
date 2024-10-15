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
import { MessageInput } from "./MessageInput";
export function ConversationBody({ conversationId }: ConversationBodyProps) {
  console.log("convoID: ", conversationId);
  
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
  return (
    <div
      style={{
        height: "90vh",
      }}
    >
      <div
        style={{
          height: "90%",
          overflowY: "auto",
        }}
      >
        {messages.map((message) => (
          <MessageCard key={message.messageId} {...message} />
        ))}
      </div>

      <div
        style={{
          height: "10%",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          padding: "10px 20px",
        }}
      >
        <MessageInput />
      </div>
    </div>
  );
}
