import { Conversation } from "@/ui/messaging/Conversation";
import { Typography } from "@mui/material";
export default function Page({ params }: { params: { id: string } }) {
  const { id: conversationId } = params;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "60% 40%",
      }}
    >
      <Conversation conversationId={conversationId} />
      <div
        style={{
          borderLeft: "3px solid #E0E4F2",
        }}
      >
        <Typography>Hello World</Typography>
      </div>
    </div>
  );
}
