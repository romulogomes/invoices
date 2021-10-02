import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import NewInvoiceDetails from '../components/newinvoice/NewInvoiceDetails';

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
          <NewInvoiceDetails />
        </Grid>
      </Container>
    </Box>
  </>
);

export default NewInvoice;
