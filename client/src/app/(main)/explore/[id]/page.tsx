import { Conversation } from "@/ui/messaging/Conversation";
export default function Page({ params }: { params: { id: string } }) {
  const { id: conversationId } = params;
  return (
    <div>
      <Conversation conversationId={conversationId} />
    </div>
  );
}
