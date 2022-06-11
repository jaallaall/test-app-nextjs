import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";

export const AskDialog: React.FC<{
  handleClickOpen: (e?: any) => void;
  open: boolean;
  handleCloseModal?: (e?: any) => void;
  isLoading?: boolean;
  title?: string;
}> = memo(
  ({
    handleClickOpen,
    open,
    handleCloseModal,
    isLoading,
    title,
  }): React.ReactElement => {
    const { t } = useTranslation();
    const handleClose: () => void = () => {
      handleClickOpen(false);
    };

    return (
      <Dialog
        onClose={handleCloseModal}
        open={open}
        maxWidth="xs"
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "primary.main",
            p: 3,
          },
        }}
      >
        <Typography variant="h5" textAlign="center">
          {t("askDelete")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Button
            onClick={handleCloseModal}
            color="secondary"
            variant="outlined"
            sx={{ mr: 1 }}
          >
            {t("cancel")}
          </Button>
          <LoadingButton
            type="submit"
            color="secondary"
            variant="outlined"
            loading={isLoading}
            loadingPosition="start"
            onClick={handleClose}
          >
            {t("delete")}
          </LoadingButton>
        </Box>
      </Dialog>
    );
  }
);
