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
  const messageTest: MessageBodyProps = {
    avatar: "avatar1",
    sender_username: "Bropharah",
    timestamp: new Date(),
    message: "Hi There!",
    upVotes: 0,
    downVotes: 0,
  };
  return <MessageCard {...messageTest} />;
}
