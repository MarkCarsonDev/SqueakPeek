import {
  IconButton,
  InputAdornment,
  TextField,
  Modal,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons/faCircleUp";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { insertPrivateConversation } from "@/lib/utils/insertPrivateConversation";
import { useProfile } from "@/lib/store/profile";

interface PrivateMessageModalProps {
  isOpen: boolean;
  receiver_username: string;
  receiver_id: string;
  onClose: () => void;
}

/**
 * A modal that allows the current user to start a conversation with another user in the company threads
 * @param {boolean} isOpen - A value that determines if the modal is rendered
 * @param {string} receiverUsername - The other user's username that the current user has selected to attempt to start a new conversation with
 * @param {() => void} onClose - A function that closes the PrivateMessageModal when invoked
 */
export function PrivateMessageModal({
  isOpen,
  receiver_username,
  receiver_id,
  onClose,
}: PrivateMessageModalProps) {
  const [currentMessage, setCurrentMessage] = useState("");
  const { profile } = useProfile();
  const router = useRouter();

  const handleSendMessage = async () => {
    if (profile) {
      const { data, error } = await insertPrivateConversation(
        profile.profile_id,
        receiver_id
      );

      console.log("data: ", data);
      console.log("error: ", error);
    }
    // // TODO Replace hardcoded value with the real conversationID
    // router.push(`/message/private/private_conversationID`);
  };
  return (
    <Modal
      sx={{
        zIndex: 2,
      }}
      open={isOpen}
      onClose={onClose}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 500,
          bgcolor: "background.paper",
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          outline: "0", // disables outline when this component is focused
          flexDirection: "column",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          style={{
            fontWeight: "bold",
          }}
        >
          Direct Message {receiver_username}?
        </Typography>
        <TextField
          sx={{
            width: 450,
            marginTop: "50px",
          }}
          autoFocus
          value={currentMessage}
          placeholder="Message..."
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSendMessage}>
                    <FontAwesomeIcon
                      style={{
                        color: "#496FFF",
                      }}
                      icon={faCircleUp}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              // add backend logic to send message into conversation table
              handleSendMessage();
            }
          }}
        />

        <div
          style={{
            marginTop: "25px",
          }}
        >
          <Button
            onClick={onClose}
            className="borderline"
            sx={{
              width: 200,
              border: "3px solid #E0E4F2",
              marginRight: "20px",
            }}
          >
            <Typography>Cancel</Typography>
          </Button>
          <Button
            onClick={handleSendMessage}
            className="borderline"
            sx={{
              width: 200,
              backgroundColor: "#496FFF",
              marginLeft: "20px",
            }}
          >
            <Typography
              sx={{
                color: "white",
              }}
            >
              Send
            </Typography>
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
