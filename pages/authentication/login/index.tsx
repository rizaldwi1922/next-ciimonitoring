import Link  from 'next/link';
import { ReactElement, useState } from 'react';
import { Grid, Box, Card, Stack, Typography, TextField, Button } from '@mui/material';
import BlankLayout from '../../../src/layouts/blank/BlankLayout';
import Cookie from 'js-cookie'

// components
import PageContainer from '../../../src/components/container/PageContainer';
import Logo from '../../../src/layouts/full/shared/logo/Logo';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login2 = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const baseURl = process.env.NEXT_PUBLIC_URL;
  const route = useRouter();

  const login = async() => {
    axios.post(`${baseURl}/api/login`, {
      email: email,
      password: password
    })
      .then(response => {
        localStorage.setItem("token", response.data.token)
        Cookie.set("session", JSON.stringify(response.data.user))
        route.push("/dashboard")
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo height={154} width={292} />
              </Box>
              <Stack sx={{ mb:4 }}>
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="username"
                    mb="5px"
                  >
                    Username
                  </Typography>
                  <TextField id="username" label="Username" value={email} onChange={e => setEmail(e.target.value)} variant="outlined" fullWidth/>
                </Box>
                <Box mt="25px">
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="password"
                    mb="5px"
                  >
                    Password
                  </Typography>
                  <TextField id="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} variant="outlined" fullWidth/>
                </Box>
              </Stack>
              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={login}
                  type="submit"
                >
                  Sign In
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Login2;

Login2.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout>{page}</BlankLayout>;
};