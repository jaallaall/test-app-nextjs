import { AskDialog, Link } from "@mui";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Options } from "interfaces";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useDeleteSocials } from "services";
import { icons } from "./data";
import EdditSocial from "./EdditSocial";

interface Props {
  handleClickEdit?: () => void;
  item: Options;
  clearSearch: () => void;
  setOpenSnack: (e: any) => void;
  data?: Options[];
}

const Social: React.FC<Props> = ({
  item,
  clearSearch,
  setOpenSnack,
  data,
}): React.ReactElement => {
  const Icon = icons[item?.type?.icon as keyof typeof icons];
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useDeleteSocials();
  const [open, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [arrId, setArrId] = useState<number[]>([]);

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
            {t(item?.type.value)}
            <Typography
              component="small"
              fontSize="small"
              sx={{ mr: 1, ml: 2 }}
            >
              {t("link")} :
            </Typography>
            <Link
              href={item?.link}
              sx={{
                color: "secondary.main",
                textDecoration: "underline",
                wordBreak: "break-all",
                "&:hover": {
                  color: "secondary.dark",
                },
              }}
              target="_blank"
              className="en"
            >
              {item?.link}
            </Link>
          </Typography>
          <Box>
            <Button
              startIcon={<EditIcon />}
              color="secondary"
              onClick={() => setOpen(true)}
              disabled={open}
            >
              {t("edit")}
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              color="warning"
              onClick={() => handleClickDelete(item.id)}
            >
              {t("delete")}
            </Button>
          </Box>
        </Box>
        <EdditSocial
          open={open}
          setOpen={() => setOpen(false)}
          item={item}
          setOpenSnack={setOpenSnack}
          data={data}
        />
      </Paper>
      {arrId.includes(item?.id) && (
        <AskDialog
          open={show}
          handleClickOpen={() => handleClickRemove(item.id)}
          handleCloseModal={() => setShow(false)}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default Social;
