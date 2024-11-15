import { Modal, Button, Typography } from "@mui/material";
import { useAlert } from "@/lib/store/alert";
import { useTrack, Application, ApplicationStage } from "@/lib/store/track";
import { Profile } from "@/lib/store/profile";
interface ApplicationDeleteProps {
  open: boolean;
  handleClose: () => void;
  application: Application;
  profile: Profile;
  status: ApplicationStage;
}

export default function ApplicationDelete({
  open,
  handleClose,
  application,
  profile,
  status,
}: ApplicationDeleteProps) {
  const { removeApplication } = useTrack();
  const { setAlert } = useAlert();
  const handleDelete = async () => {
    const { success, message } = await removeApplication(
      status,
      application,
      profile
    );
    if (success) {
      setAlert({ message, type: "success" });
      handleClose();
    } else {
      setAlert({ message, type: "error" });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div>
        <Typography id="simple-modal-title">
          Are you sure you want to delete this application?
        </Typography>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </div>
    </Modal>
  );
}
