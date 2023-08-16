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
import { Formik, Form } from "formik";
import { registerSchema } from "../../constant/validation";
import FormikControls from "../../common/formik/FormikControls";
import useRegister from "../../hook/auth/useRegister";
import { ClipLoader } from "react-spinners";

const Register = () => {
  const { handleSubmit, initialValues, isLoading, setValuesOfForm } =
    useRegister();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: (theme) => theme.palette.primary.main }}
        >
          Redirecting...
        </Typography>
        <ClipLoader />
      </Box>
    );
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
            marginTop: "2rem",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "1.7rem",
              }}
            >
              Register
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
              validationSchema={registerSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleSubmit }) => (
                <Form
                  onBlur={() => {
                    setValuesOfForm(values);
                  }}
                >
                  <FormikControls control="formikInput" name="email" />
                  <Typography color={"red"}>{}</Typography>
                  <FormikControls control="formikInput" name="password" />
                  <FormikControls
                    control="formikInput"
                    name="confirmPassword"
                  />
                  <Divider
                    sx={{
                      mt: 4,
                      mb: 3,
                    }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: colors.primaryHoverColor,
                        },
                      }}
                    >
                      register
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
              mt: 2,
            }}
          >
            <Typography>
              Already have account{" "}
              <a style={{ fontWeight: "700" }} href="/login">
                login
              </a>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <InfoPart />
    </Grid>
  );
};

export default Register;
