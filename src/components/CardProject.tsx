import React from "react";
import { Stack, Typography, Button, Box } from "@mui/material";
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
    <Card
      sx={{
        paddingBottom: 5,
        height: 250,
      }}
      raised
    >
      <CardHeader title={props.title} subheader={props.date} />
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
          <Stack spacing={1} direction="row" justifyContent="center" pb={1}>
            {props.action}
          </Stack>
          <Box>
            <Button onClick={() => openLink(props.url)}>
              <Stack spacing={1} direction="row">
                <Link /> <Typography fontSize={13}> go to link</Typography>
              </Stack>
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardProjects;
