import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

const styles: { [key: string]: SxProps<Theme> } = {
  containerWrapper: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
  },
};

export default styles;
