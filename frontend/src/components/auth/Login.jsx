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
import { Logo } from "src/assets/assets";
import colors from "src/theme/variables";
import InfoPart from "src/components/auth/components/InfoPart";

const Login = () => {
  return (
    <Grid container sx={{ height: "100vh" }}>
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
                  borderRadius: "1rem",
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
                  borderRadius: "1rem",
                  border: "1px solid red",
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
                  "&:hover": {
                    backgroundColor: colors.primaryHoverColor,
                  },
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
              <a style={{ fontWeight: "700" }} href="/register">
                sign up
              </a>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <InfoPart />
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
