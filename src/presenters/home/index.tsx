"use client";

import React, { useState } from "react";
import {
  Stack,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Grid,
  Chip,
  Button,
} from "@mui/material";

import { EmailOutlined } from "@mui/icons-material";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import CardProject from "@/components/CardProject";

import { EXPERIENCE } from "./config";
const HomePresenter: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [tabValue, setTabValue] = useState("work");

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
        <Tab label="WORK EXPERIENCE" value="work" />
        <Tab label="PROJECTS" value="project" />
        <Tab label="CONTACT" value="contact" />
      </Tabs>

      {tabValue === "work" && (
        <Grid container>
          {EXPERIENCE.map((data) => {
            if (data.type !== "work") return null;
            return (
              <Grid item xs={12} md={3} padding={1}>
                <CardProject
                  title={data.title}
                  description={data.description}
                  url={data.url}
                  date={data.date}
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
      {tabValue === "project" && (
        <Grid container>
          {EXPERIENCE.map((data) => {
            if (data.type !== "project") return null;
            return (
              <Grid item xs={12} md={3} padding={1}>
                <CardProject
                  title={data.title}
                  description={data.description}
                  url={data.url}
                  date={data.date}
                  action={
                    <>
                      {data.tech.map((tech) => {
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

      {tabValue === "contact" && (
        <Stack spacing={1}>
          <Stack justifyContent="center">
            <Button sx={{ padding: 2 }}>
              <EmailOutlined /> ahmadyudafahrudin@gmail.com
            </Button>
          </Stack>
          <Typography>
            If you're looking to connect, to discuss a potential collaboration
            or just to say hello, feel free to reach out to me by sending an
            email.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default HomePresenter;
