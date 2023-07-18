// import { useState } from "react";
// import axiosRequest from "../utils/axiosRequest";
import {
  Grid,
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { Logo, LightLogo } from "../assets/assets";
const Login = () => {
  return (
    <Grid container>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            ml: 3,
            height: "2rem",
            padding: ".5rem 0",
          }}
        >
          <IconButton sx={{ width: "3rem" }}>
            <Logo />
          </IconButton>
          <Typography fontWeight={600}>Task Master</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            // border: "1px solid red",
            width: "70%",
            margin: "auto",
            marginTop: "5rem",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "1.7rem",
              }}
            >
              Login
            </Typography>
            <Typography
              sx={{
                marginTop: 1,
                fontWeight: "500",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              Welcome to Task Master. Manage your task with task master and make
              your life productive.
            </Typography>
          </Box>
          <form action="Post" style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 5,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                }}
              >
                E-mail
              </Typography>
              <TextField
                id="email"
                name="email"
                placeholder="Enter your email here"
                sx={{
                  width: "60%",
                  border: "1px solid",
                  borderColor: (theme) => theme.palette.grey[50],
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 3,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                }}
              >
                Password
              </Typography>
              <TextField
                id="password"
                name="password"
                type="password"
                // border="1px solid "
                placeholder="Enter your password here"
                sx={{
                  width: "60%",
                  border: "1px solid red",
                  borderColor: (theme) => theme.palette.grey[50],
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 3,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                }}
              >
                Confirm password
              </Typography>
              <TextField
                id="password"
                name="password"
                type="password"
                variant="outlined"
                placeholder="Confirm your password here"
                sx={{
                  width: "60%",
                  border: "1px solid red",
                  color: "text.primary",
                  borderColor: (theme) => theme.palette.grey[50],
                }}
              />
            </Box>
            <Divider
              sx={{
                mt: 3,
                mb: 3,
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "primary.main",
                  color: "text.secondary",
                }}
              >
                login
              </Button>
            </Box>
          </form>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              mt: 4,
            }}
          >
            <Typography>
              Don't have account{" "}
              <a style={{ fontWeight: "700" }} href="/">
                sign up
              </a>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          bgcolor: "primary.main",
        }}
      >
        <IconButton>
          <LightLogo />
        </IconButton>
        <Box>
          <Typography>
            TaskManager is a comprehensive task management solution designed to
            streamline and enhance productivity in your organization. With its
            user-friendly interface and powerful features, TaskManager empowers
            teams to efficiently manage and track tasks, collaborate seamlessly,
            and stay organized.
          </Typography>
        </Box>
        <Box>
          <ul>
            <li>
              Task Creation and Assignment: Easily create tasks, assign them to
              team members, and set due dates for timely completion.
            </li>
            <li>
              Progress Tracking: Monitor task progress at a glance, ensuring
              transparency and accountability.
            </li>
            <li>
              Task Prioritization: Prioritize tasks based on urgency and
              importance, helping you focus on what matters most
            </li>
          </ul>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;

// const [userValue, setUserValue] = useState({
//   email: "",
//   password: "",
//   confirmPassword: "",
// });

// const handleChange = (event) => {
//   console.log(event.target.name, event.target.value);
//   setUserValue({
//     ...userValue,
//     [event.target.name]: event.target.value,
//   });
// };

// const handleSubmit = async (event) => {
//   event.preventDefault();

//   if (userValue.password !== userValue.confirmPassword) {
//     window.alert("password should be matched with confrim password");
//     return;
//   }
//   axiosRequest({ method: "post", url: "/register", data: userValue });
// };

/* <div className="App">
<form onSubmit={handleSubmit}>
  <input
    name="email"
    type="email"
    value={userValue.email}
    onChange={handleChange}
    required={true}
  />
  <input
    name="password"
    type="password"
    value={userValue.password}
    onChange={handleChange}
    required={true}
  />
  <input
    name="confirmPassword"
    type="password"
    value={userValue.confirmPassword}
    onChange={handleChange}
    required={true}
  />
  <button type="submit"> submit </button>
</form>
</div> */
