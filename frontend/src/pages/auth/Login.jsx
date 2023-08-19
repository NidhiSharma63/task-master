import {
  Grid,
  Box,
  IconButton,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { Logo } from "../../assets/assets";
import colors from "../../theme/variables";
import InfoPart from "../../components/auth/components/InfoPart";
import FormikControls from "../../common/formik/FormikControls";
import { Formik, Form } from "formik";
import { loginSchema } from "../../constant/validation";
import useLogin from "../../hook/auth/useLogin";
import CommonLoader from "../../common/loader/CommonLoader";

const Login = () => {
  const { handleSubmit, initialValues, isLoading, setFormValues } = useLogin();

  if (isLoading) {
    return <CommonLoader value={"Redirecting..."} />;
  }

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          background: (theme) => theme.palette.primary.main,
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
          <Typography sx={{ color: "white" }} fontWeight={600}>
            Task Master
          </Typography>
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
                fontSize: "1.7rem",
                color: "white",
              }}
            >
              Login
            </Typography>
            <Typography
              sx={{
                marginTop: 3,
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
              {({ values }) => (
                <Form
                  onBlur={() => {
                    setFormValues(values);
                  }}
                >
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
                      variant="outlined"
                      sx={{
                        backgroundColor: "primary.main",
                        "&:hover": {
                          borderColor: colors.secondaryTextColor,
                        },
                        borderColor: colors.secondaryTextColor,
                        color: colors.secondaryTextColor,
                      }}
                    >
                      login
                    </Button>
                  </Box>
                </Form>
              )}
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
            <Typography sx={{ color: "white" }}>
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
