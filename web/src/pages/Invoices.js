import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import InvoiceListResults from '../components/invoice/InvoiceListResults';
import InvoiceListToolbar from '../components/invoice/InvoiceListToolbar';
import InvoicesService from 'src/services/InvoicesService';
import { useEffect, useState } from 'react';
import { handleErrorApi } from 'src/services/Config';

const InvoicesList = () => {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    listInvoices();
  }, []);
  
  const listInvoices = () => {
    InvoicesService.listInvoices()
      .then(response => {
        setInvoices(response.data);
      }).catch(erro => {
        handleErrorApi(erro);
      });
  }

  return (
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
  )
};

export default InvoicesList;
