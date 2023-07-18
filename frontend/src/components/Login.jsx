import { useState } from "react";
import axiosRequest from "../utils/axiosRequest";
import { Grid, Box, IconButton } from "@mui/material";
import { Logo } from "../assets";
// import logo from "../icons/logo.svg";

const Login = () => {
  const [userValue, setUserValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setUserValue({
      ...userValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userValue.password !== userValue.confirmPassword) {
      window.alert("password should be matched with confrim password");
      return;
    }
    axiosRequest({ method: "post", url: "/register", data: userValue });
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Box>
          <IconButton>
            <Logo />
          </IconButton>
        </Box>
        <Box></Box>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          border: "1px solid red",
          bgcolor: "primary.main",
        }}
      ></Grid>
    </Grid>
  );
};

export default Login;

{
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
}
