"use client";

import React, { useState } from "react";
import {
  Stack,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  Box,
  Grid,
  Chip,
} from "@mui/material";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import CardProject from "@/components/CardProject";

import { EXPERIENCE } from "./config";
const HomePresenter: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [tabValue, setTabValue] = useState("project");

  return (
    <Stack spacing={3} textAlign="center">
      <Typography variant={isMobile ? "subtitle1" : "h2"}>
        Hello, My Name Yuda ✋ I like explore new things in the field of
        Computers & Science.
      </Typography>
      <Tabs
        value={tabValue}
        onChange={(_, value) => setTabValue(value)}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="MY PROJECTS & EXPERIENCE" value="project" />
        <Tab label="CONTACT" value="contact" />
      </Tabs>

      {tabValue === "project" && (
        <Grid container>
          {EXPERIENCE.map((data) => {
            return (
              <Grid item xs={12} md={3} padding={1}>
                <CardProject
                  title={data.title}
                  description={data.description}
                  url={data.url}
                  action={
                    <>
                      {data.tech.map((tech) => {
                        if (!tech.color)
                          return <Chip variant="outlined" label={tech.label} />;
                        return (
                          <Chip
                            variant="outlined"
                            sx={{ borderColor: tech.color }}
                            label={tech.label}
                          />
                        );
                      })}
                    </>
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Stack>
  );
};

export default HomePresenter;
