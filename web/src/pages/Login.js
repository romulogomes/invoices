import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    token: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const generateToken = (e) => {
    alert("Token Gerado " + values.email);
    console.log(values.email);
    e.preventDefault();
  }

  const login = (e) => {
    navigate('/app/invoices', { replace: true });
    e.preventDefault();
  }


  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={generateToken}>
            <Box sx={{ mb: 3 }}>
              <Typography
                color="textPrimary"
                variant="h2"
              >
                Sign in
              </Typography>
            </Box>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  onChange={handleChange}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  type="email"
                  value={values.email}
                  variant="outlined"
                  required
                />
                <Button
                  color="primary"
                  fullWidth
                  type="submit"
                  size="large"
                  variant="contained"
                >
                  Gerar token de acesso
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                login with token access
              </Typography>
            </Box>

          </form>


          <form onSubmit={login}>
            <TextField
              fullWidth
              label="Token"
              margin="normal"
              name="token"
              onChange={handleChange}
              value={values.token}
              required
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign in now
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
