import Visibility from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import logoImage from 'src/assets/icons/Logo.png';
import FormikControls from 'src/common/formik/FormikControls';
import { CommonLoaderWithBackDrop } from 'src/common/loader/CommonLoader';
import InfoPart from 'src/components/auth/components/InfoPart';
import { loginSchema } from 'src/constant/validation';
import useLogin from 'src/hook/auth/useLogin';
import { isBackDropLoaderDisplayed } from 'src/redux/boolean/booleanSlice';
import colors from 'src/theme/variables';

const Login = () => {
  const {
    handleSubmit,
    initialValues,
    isLoading,
    setFormValues,
    toggle,
    handleToggle,
  } = useLogin();

  const dispatch = useDispatch();

  if (isLoading) {
    dispatch(isBackDropLoaderDisplayed(true));
  }

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          background: colors.mainColor,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            ml: 3,
            height: '2rem',
            padding: '.5rem 0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src={logoImage} alt="project" style={{ width: '40px' }} />

            <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
              Task Master
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            // border: "1px solid red",
            width: '70%',
            margin: 'auto',
            marginTop: '5rem',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '1.7rem',
                color: 'white',
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
          <Box sx={{ width: '100%' }}>
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

                  <FormikControls
                    control="formikInput"
                    name="password"
                    //InputProps, to avoid some boilerplates or add missing properties
                    InputProps={{
                      endAdornment: (
                        //InputAdornment can be used for providing default props or style overrides at the theme level.
                        <InputAdornment
                          position="end"
                          onClick={handleToggle}
                          style={{ cursor: 'pointer' }}
                        >
                          {toggle ? <Visibility /> : <VisibilityOffIcon />}
                        </InputAdornment>
                      ),
                    }}
                    type={toggle ? 'text' : 'password'}
                  />

                  <Divider
                    sx={{
                      mt: 4,
                      mb: 3,
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type="submit"
                      variant="outlined"
                      sx={{
                        backgroundColor: 'primary.main',
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
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              mt: 4,
            }}
          >
            <Typography sx={{ color: 'white' }}>
              Don't have account{' '}
              <a style={{ fontWeight: '700', color: 'white' }} href="/register">
                sign up
              </a>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <InfoPart />
      <CommonLoaderWithBackDrop />
    </Grid>
  );
};

export default Login;
