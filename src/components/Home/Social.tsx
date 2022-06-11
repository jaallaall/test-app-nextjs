import { AskDialog, Link } from "@mui";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import AddSocial from "./AddSocial";

interface Props {
  handleClickEdit: () => void;
}

const Social: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const handleClickEdit = () => {
    setOpen(true);
  };

  const handleClickDelete = () => {
    setShow(true);
  };

  return (
    <>
      <Paper sx={{ mt: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ ...(open && { mb: 2 }) }}
        >
          <Typography component="span" display="flex" alignItems="center">
            <FacebookIcon sx={{ mr: 1 }} />
            {t("facebook")}
            <Typography
              component="small"
              fontSize="small"
              sx={{ mr: 1, ml: 2 }}
            >
              {t("link")} :
            </Typography>
            <Link
              href={"/"}
              sx={{
                color: "secondary.main",
                textDecoration: "underline",
                "&:hover": {
                  color: "secondary.dark",
                },
              }}
            >
              {"link"}
            </Link>
          </Typography>
          <Box>
            <Button
              startIcon={<EditIcon />}
              color="secondary"
              onClick={handleClickEdit}
              disabled={open}
            >
              {t("edit")}
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              color="warning"
              onClick={handleClickDelete}
            >
              {t("delete")}
            </Button>
          </Box>
        </Box>
        <AddSocial
          open={open}
          setOpen={() => setOpen(false)}
          title={t("editAddPath")}
          btnTitle={t("editAddPath")}
        />
      </Paper>
      <AskDialog
        open={show}
        handleClickOpen={handleClickDelete}
        handleCloseModal={() => setShow(false)}
      />
    </>
  );
};

export default Social;
