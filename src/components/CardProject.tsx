import React from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import { Link } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

interface Props {
  title?: string;
  date?: string;
  name?: string;
  imageUrl?: string;
  image?: string;
  description?: string;
  url?: string;
  action?: React.ReactNode;
}

const openLink = (url?: string) => {
  window.open(url, "_blank");
};

const CardProjects: React.FC<Props> = (props) => {
  return (
    <Card sx={{ height: 240, display: "flex", flexDirection: "column" }} raised>
      <CardHeader title={props.title} subheader={props.date} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardContent sx={{ marginTop: "auto" }}>
        <Stack spacing={1} justifyContent="center" direction="row" pb={1}>
          {props.action}
        </Stack>
        <IconButton onClick={() => openLink(props.url)}>
          <Link />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default CardProjects;
