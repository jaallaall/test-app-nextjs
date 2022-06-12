import { Button, Stack, TextField } from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { useTranslation } from "next-i18next";

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: unknown;
}

const Search: React.FC<Props> = ({
  handleChange,
  value,
}): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <Stack
      sx={{
        flex: { xs: "auto" },
        position: { md: "relative", xs: "static" },
        mb: 3,
      }}
    >
      <TextField
        fullWidth
        // id="standard-bare"
        variant="outlined"
        placeholder={t("search")}
        onChange={handleChange}
        value={value}
        InputProps={{
          endAdornment: (
            <Button component="div" sx={{ color: "text.secondary" }}>
              <SearchOutlined />
            </Button>
          ),
        }}
        color="secondary"
      />
    </Stack>
  );
};

export default Search;
