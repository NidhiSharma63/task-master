// import { useState } from "react";
// import axiosRequest from "../utils/axiosRequest";
import {
  Grid,
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Logo, LightLogo } from "../assets/assets";
const Login = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Box>
          <IconButton>
            <Logo />
          </IconButton>
          <Typography>Task Master</Typography>
        </Box>
        <Box>
          <Typography>Login</Typography>
          <Typography>
            Welcome to Task Master. Manage you task with task master and make
            your life productive
          </Typography>
        </Box>
        <form action="Post">
          <Box>
            <Typography>E-mail</Typography>
            <TextField
              id="email"
              name="email"
              border="1px solid red"
              placeholder="Enter your email here"
              sx={{
                border: "1px solid",
                borderColor: (theme) => theme.palette.grey[50],
              }}
            />
          </Box>
          <Box>
            <Typography>Password</Typography>
            <TextField
              id="password"
              name="password"
              type="password"
              border="1px solid "
              placeholder="Enter your password here"
              sx={{
                border: "1px solid red",
                borderColor: (theme) => theme.palette.grey[50],
              }}
            />
          </Box>
          <Box>
            <Typography>Confirm password</Typography>
            <TextField
              id="password"
              name="password"
              type="password"
              border="1px solid"
              variant="outlined"
              placeholder="Confirm your password here"
              sx={{
                border: "1px solid red",
                color: "text.primary",
                borderColor: (theme) => theme.palette.grey[50],
              }}
            />
          </Box>
          <Button
            type="submit"
            sx={{
              backgroundColor: "primary.main",
              color: "text.secondary",
            }}
          >
            login
          </Button>
        </form>
        <Box>
          <Typography>
            Don't have account <a href="/">sign up</a>
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          border: "1px solid red",
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
