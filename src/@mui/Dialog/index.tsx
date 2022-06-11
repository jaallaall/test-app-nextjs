import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export const BootstrapDialogTitle: React.FC<{
  id: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ children, onClose, ...other }): React.ReactElement => {
  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: "grey.200",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
