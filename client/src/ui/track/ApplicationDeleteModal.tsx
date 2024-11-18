import { Modal, Button, Typography, Box } from "@mui/material";
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
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: "60%",
          backgroundColor: 'white',
          p: 4, 
          borderRadius: '8px',
        }}
      >
        <Typography 
          id="simple-modal-title" 
          variant="h4"
          sx={{
            marginBottom: "20px"
          }}>
          Are you sure you want to delete this application?
        </Typography>
        <Typography 
          id="simple-modal-description"
          variant="subtitle1">
          This action cannot be undone.
        </Typography>
        <Box
          sx={{
            flexDirection: "row",
            fullWidth: "100%",
            marginTop: "20px",
            height: "58px",
          }}
        >
          <Button
            variant="contained"
            onClick={handleClose}
            color="primary"
            sx={{
              marginRight: "3%",
              color: "#3C435C",
              backgroundColor: "white",
              boxShadow: "none",
              border: "1px solid #E0E3EB",
              borderRadius: "8px",
              width: "47%",
              height: "100%",
              ":hover": {
                backgroundColor: "white",
                border: "1px solid #A6B0C3",
                boxShadow: "none",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="primary"
            sx={{
              marginLeft: "3%",
              boxShadow: "none",
              borderRadius: "8px",
              backgroundColor: "#496FFF",
              width: "47%",
              height: "100%",
              ":hover": {
                backgroundColor: "#3B5AC6",
                boxShadow: "none",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
