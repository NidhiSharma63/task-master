import React from "react";
import { Grid, Box, Typography, IconButton } from "@mui/material";
import { LightLogo } from "./assets/assets";

const InfoPart = () => {
  return (
    <Grid
      item
      xs={6}
      sx={{
        bgcolor: "primary.main",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        gap: "3rem",
        height: "100%",
      }}
    >
      <IconButton>
        <LightLogo />
      </IconButton>
      <Box
        sx={{
          width: "80%",
          textAlign: "center",
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        <Typography sx={{ fontSize: "1.2rem" }}>
          TaskManager is a comprehensive task management solution designed to
          streamline and enhance productivity in your organization. With its
          user-friendly interface and powerful features, TaskManager empowers
          teams to efficiently manage and track tasks, collaborate seamlessly,
          and stay organized.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.4rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              width: 10,
              height: 10,
              borderRadius: "50%",
            }}
            variant="circular"
          />
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
              fontSize: ".9rem",
              width: "100%",
            }}
          >
            Task Creation and Assignment: Easily create tasks, assign them to
            team members, and set due dates for timely completion.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              width: 10,
              height: 10,
              borderRadius: "50%",
            }}
            variant="circular"
          />
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
              fontSize: ".9rem",
              width: "100%",
            }}
          >
            Progress Tracking: Monitor task progress at a glance, ensuring
            transparency and accountability.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              width: 10,
              height: 10,
              borderRadius: "50%",
            }}
            variant="circular"
          />
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
              fontSize: ".9rem",
              width: "100%",
            }}
          >
            Task Prioritization: Prioritize tasks based on urgency and
            importance, helping you focus on what matters most.
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default InfoPart;
