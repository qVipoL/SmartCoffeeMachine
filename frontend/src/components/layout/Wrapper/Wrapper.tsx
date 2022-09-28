// PLUGINS IMPORTS //
import React, { FC, ReactNode } from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import styles from "./styles";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <Box sx={styles.containerWrapper}>
      <CssBaseline />
      <Container component={"main"} maxWidth={"lg"} sx={styles.container}>
        {children}
      </Container>
    </Box>
  );
};

export default Wrapper;
