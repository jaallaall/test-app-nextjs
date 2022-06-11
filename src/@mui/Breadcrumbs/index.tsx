import CircleIcon from "@mui/icons-material/Circle";
import { SxProps } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { Options } from "interfaces";
import { Link } from "../Link";

interface Props {
  breadcrumbs: Options[];
  sx?: SxProps;
}

export const BreadcrumbsCustom: React.FC<Props> = ({
  breadcrumbs,
  sx,
}): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <Breadcrumbs
      separator={<CircleIcon sx={{ color: "grey.100", fontSize: 12 }} />}
      aria-label="breadcrumb"
      color="inherit"
      sx={{
        pb: { xs: 2, md: 0 },
        overflowX: "auto",
        whiteSpace: "nowrap",
        "& .MuiBreadcrumbs-ol": {
          flexWrap: "nowrap",
        },
        ...sx,
      }}
    >
      {breadcrumbs?.map((item, i) => {
        if (i === breadcrumbs.length - 1) {
          return <Typography key={item.id}>{t(item.title)}</Typography>;
        }
        return (
          <Link
            underline="hover"
            sx={{
              "&:hover": {
                color: "text.secondary",
              },
            }}
            key={item.id}
            href={item.href}
          >
            {t(item.title)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
