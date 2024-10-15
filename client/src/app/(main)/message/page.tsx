"use client";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { createSupabaseClient } from "../../../../lib/supabase/client";
export default function Page() {
  useEffect(() => {
    const supabase = createSupabaseClient();
    const channelB = supabase.channel("room-1");
    // Join a room/topic. Can be anything except for 'realtime'.

    channelB.subscribe((status) => {
      // Wait for successful connection
      console.log("status: ", status);
      if (status !== "SUBSCRIBED") {
        console.log("failure");
        return null;
      }

      // Send a message once the client is subscribed
      channelB.send({
        type: "broadcast",
        event: "test",
        payload: { message: "hello, world" },
      });
    });
  }, []);

  return <Typography variant="h2">Message</Typography>;
}
