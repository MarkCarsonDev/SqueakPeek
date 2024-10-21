import { Conversation } from "@/ui/messaging/Conversation";
export default function Page({ params }: { params: { id: string } }) {
  const { id: conversationId } = params;
  return (
    <div style={{
      display:"grid",
      gridAutoColumns:"60% 40%"
    }}>
      <Conversation conversationId={conversationId} />
      <div>
        
      </div>
    </div>
  );
}
