import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import InvoiceListResults from '../components/invoice/InvoiceListResults';
import InvoiceListToolbar from '../components/invoice/InvoiceListToolbar';
import invoices from '../__mocks__/invoices';

const InvoicesList = () => (
  <>
    <Helmet>
      <title>Invoices</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <InvoiceListToolbar />
        <Box sx={{ pt: 3 }}>
          <InvoiceListResults invoices={invoices} />
        </Box>
      </Container>
    </Box>
  </>
);

export default InvoicesList;
