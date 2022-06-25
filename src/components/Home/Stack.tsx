import AddRoadIcon from "@mui/icons-material/AddRoad";
import { Box, CircularProgress } from "@mui/material";

interface Props {
  isLoading: boolean;
  isError: boolean;
  isIdle: boolean;
  error: unknown;
  children?: React.ReactNode;
}

const StackLoading: React.FC<Props> = ({
  isLoading,
  isError,
  error,
  isIdle,
  children,
}): React.ReactElement | null => {
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 250,
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }
  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 250,
        }}
      >
        {(error as Error).message}
      </Box>
    );
  }
  if (isIdle) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 250,
        }}
      >
        <AddRoadIcon sx={{ fontSize: 150 }} />
      </Box>
    );
  }

  return <>{children}</>;
};

export default StackLoading;
