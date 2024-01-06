import React from "react";
import {
  Stack,
  Typography,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import { CoffeeOutlined } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface Props {
  title?: string;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const DefaultWrapper: React.FC<Props> = ({
  children,
  title,
  leftIcon,
  rightIcon,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack px={isMobile ? 2 : 7} spacing={2}>
      <Stack direction="row">
        <ThemeProvider theme={darkTheme}>
          <AppBar color="default" position="static">
            <Toolbar>
              {leftIcon || <CoffeeOutlined color="inherit" />}
              <Typography ml={2}>Let's have coffee</Typography>
              <Stack direction="row" spacing={1} sx={{ marginLeft: "auto" }}>
                <Stack direction="row" spacing={1}>
                  {rightIcon}
                </Stack>
              </Stack>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Stack>
      <Stack>{children}</Stack>
    </Stack>
  );
};

export default DefaultWrapper;
