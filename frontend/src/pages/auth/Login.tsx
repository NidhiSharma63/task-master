import Visibility from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { Logo } from 'src/assets/assets';
import FormikInput from 'src/common/formik/FormikInput';
import { CommonLoaderWithBackDrop } from 'src/common/loader/CommonLoader';
import InfoPart from 'src/components/auth/components/InfoPart';
import { loginSchema } from 'src/constant/validation';
import useLogin from 'src/hook/auth/useLogin';
import { useAppDispatch } from 'src/hook/redux/hooks';
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(isBackDropLoaderDisplayed(true));
    }
  }, [isLoading, dispatch]);

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          background: colors.offWhite,
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
            <img src={Logo} alt="project" style={{ width: '40px' }} />

            <Typography sx={{ fontWeight: 'bold' }}>Task Master</Typography>
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
              }}
            >
              Login
            </Typography>
            <Typography
              sx={{
                marginTop: 3,
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
                  <FormikInput name="email" label="E-mail" />

                  <FormikInput
                    name="password"
                    label="Password"
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
                      variant="contained"
                      sx={{
                        '&:hover': {
                          backgroundColor: colors.primaryColor,
                        },
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
            <Typography>
              Don't have account{' '}
              <a style={{ fontWeight: '700' }} href="/register">
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
