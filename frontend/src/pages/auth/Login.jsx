import {
  Grid,
  Box,
  IconButton,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { Logo } from "src/assets/assets";
import colors from "src/theme/variables";
import InfoPart from "src/components/auth/components/InfoPart";
import FormikControls from "src/common/formik/FormikControls";
import { Formik, Form } from "formik";
import { loginSchema } from "src/constant/validation";
import { useEffect } from "react";
import { getValueFromLS } from "src/utils/localstorage";
import { KEY_FOR_STORING_TOKEN } from "src/constant/Misc";
import { useNavigate } from "react-router-dom";
import useLoginQuery from "src/hook/useLoginQuery";

const Login = () => {
  const navigate = useNavigate();
  const token = getValueFromLS(KEY_FOR_STORING_TOKEN);
  const { mutate } = useLoginQuery();

  useEffect(() => {
    // because we are
    if (token) {
      navigate("/");
    }
  }, [token]);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    mutate(values);
  };
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
                marginTop: 3,
                fontWeight: "500",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              Welcome to Task Master. Manage your task with task master and make
              your life productive.
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <FormikControls control="formikInput" name="email" />
                <FormikControls control="formikInput" name="password" />

                <Divider
                  sx={{
                    mt: 4,
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
              </Form>
            </Formik>
          </Box>
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