import { MessageBody } from "@/ui/messaging/MessageBody";
export default function Page({ params }: { params: { id: string } }) {
  const { id: conversationId } = params;
  return (
    <div>
      <MessageBody conversationId={conversationId} />
    </div>
  );
}
