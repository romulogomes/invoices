import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
import TokenService from 'src/services/TokenService';

const Login = () => {
  const navigate = useNavigate();
  const token = new URLSearchParams(useLocation().search).get("token");
  
  useEffect(() => {
    if(token) {
      // FIXME Romulo - loading
      validateToken(token);
    }
  });

  const validateToken = (token) => {
    TokenService.validateToken({ token })
      .then(response => {
        if (response.data.mensagem == 'token_validado') {
          sessionStorage.setItem('token', token);
          navigate('/app/invoices', { replace: true });
        } else {
          alert("Token Inválido"); // FIXME Romulo token ja validado
        }
      }).catch(erro => {
        alert("erro");
        console.log(erro);
      });
  }

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
    TokenService.generateToken({ email: values.email })
      .then(response => {
        if (response.data.mensagem == 'email_enviado') {
          alert(`Token Gerado, acesse ${values.email} e valide seu token`); // FIXME Romulo Translate
        } else {
          alert("Já existe um token para o email, acesse o seu mail e verifque seu token"); // FIXME Romulo - gerar Novo
        }
      }).catch(erro => {
        alert("erro");
        console.log(erro); //handleError
      });
    e.preventDefault();
  }

  const login = (e) => {
    TokenService.login({ token: values.token })
      .then(response => {
        if (response.data.mensagem == 'login_valido') {
          sessionStorage.setItem('token', values.token);
          navigate('/app/invoices', { replace: true });
        } else {
          alert("Token inválido");
        }
      }).catch(erro => {
        alert("erro");
        console.log(erro);
      });
    
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
