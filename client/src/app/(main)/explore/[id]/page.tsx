import { ConversationBody } from "@/ui/messaging/ConversationBody";
export default function Page({ params }: { params: { id: string } }) {
  const { id: conversationId } = params;
  return (
    <div>
      <ConversationBody conversationId={conversationId} />
    </div>
  );
}
