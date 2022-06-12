import { AskDialog, Link } from "@mui";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Options } from "interfaces";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useDeleteSocials } from "services";
import AddSocial, { icons } from "./AddSocial";

interface Props {
  handleClickEdit?: () => void;
  data: Options;
  clearSearch: () => void;
}

const Social: React.FC<Props> = ({ data, clearSearch }): React.ReactElement => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useDeleteSocials();
  const [open, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [arrId, setArrId] = useState<number[]>([]);
  const [idEddit, setIdEddit] = useState<number | string>();

  const handleClickEdit = (id: number) => {
    setIdEddit(id);
    setOpen(true);
  };

  const handleClickDelete = (id: number) => {
    const arr = [];
    arr.push(id);
    setShow(true);
    setArrId(arr);
  };

  const handleClickRemove = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        setShow(false);
        clearSearch();
        queryClient.fetchInfiniteQuery("socials");
      },
    });
  };
  const Icon = (icons as any)[data.type.icon];
  return (
    <>
      <Paper sx={{ mt: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          sx={{ ...(open && { mb: 2 }) }}
        >
          <Typography
            component="span"
            display="flex"
            alignItems="center"
            flexWrap="wrap"
          >
            <Icon sx={{ mr: 1 }} />
            {t(data?.type.value)}
            <Typography
              component="small"
              fontSize="small"
              sx={{ mr: 1, ml: 2 }}
            >
              {t("link")} :
            </Typography>
            <Link
              href={data.link}
              sx={{
                color: "secondary.main",
                textDecoration: "underline",
                wordBreak: "break-all",
                "&:hover": {
                  color: "secondary.dark",
                },
              }}
            >
              {data.link}
            </Link>
          </Typography>
          <Box>
            <Button
              startIcon={<EditIcon />}
              color="secondary"
              onClick={() => handleClickEdit(data.id)}
              disabled={open}
            >
              {t("edit")}
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              color="warning"
              onClick={() => handleClickDelete(data.id)}
            >
              {t("delete")}
            </Button>
          </Box>
        </Box>
        <AddSocial
          open={open}
          setOpen={() => setOpen(false)}
          title={t("editAddPath") + " " + t(data?.type.value)}
          btnTitle={t("editAddPath") + " " + t(data?.type.value)}
          item={data}
          idEddit={idEddit}
        />
      </Paper>
      {arrId.includes(data.id) && (
        <AskDialog
          open={show}
          handleClickOpen={() => handleClickRemove(data.id)}
          handleCloseModal={() => setShow(false)}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default Social;
