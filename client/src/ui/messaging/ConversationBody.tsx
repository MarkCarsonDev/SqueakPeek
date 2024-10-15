import { MessageBodyProps } from "./MessageBody";

interface ConversationBodyProps {
  conversationId: string;
}
import { MessageBody } from "./MessageBody";
export function ConversationBody({ conversationId }: ConversationBodyProps) {
  const messageTest: MessageBodyProps = {
    avatar: "avatar1",
    sender_username: "Bropharah",
    timestamp: new Date(),
    message: "Hi There!",
    upVotes: 0,
    downVotes: 0,
  };
  return <MessageBody {...messageTest} />;
}
