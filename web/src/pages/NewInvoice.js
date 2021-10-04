import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import NewInvoiceForm from '../components/newinvoice/NewInvoiceForm';

const NewInvoice = () => (
  <>
    <Helmet>
      <title>NewInvoice</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          item
          lg={12}
          md={12}
          xs={12}
          >
          <NewInvoiceForm />
        </Grid>
      </Container>
    </Box>
  </>
);

export default NewInvoice;
