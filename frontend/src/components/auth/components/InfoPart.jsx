import React from "react";
import { Grid, Box, Typography, IconButton } from "@mui/material";
import { LightLogo } from "src/assets/assets";
import colors from "src/theme/variables";

const InfoPart = () => {
  return (
    <Grid
      item
      sm={6}
      sx={{
        bgcolor: colors.bannerColor,
        display: { xs: "none", sm: "flex" },
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        gap: { sm: "2rem", md: "3rem" },
        height: "unset",
      }}
    >
      <IconButton sx={{ width: { sm: "5rem", md: "10rem" } }}>
        <LightLogo />
      </IconButton>
      <Box
        sx={{
          width: "80%",
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography
          sx={{ fontSize: { sm: "1rem", md: "1.2rem" }, color: "white" }}
        >
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
              color: "white",
              fontSize: { sm: ".8rem", md: ".9rem" },
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
              color: "white",
              fontSize: { sm: ".8rem", md: ".9rem" },
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
              color: "white",
              fontSize: { sm: ".8rem", md: ".9rem" },
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
