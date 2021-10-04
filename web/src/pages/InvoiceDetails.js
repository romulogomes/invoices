import { Helmet } from 'react-helmet';
import {
  Alert,
  Box,
  Container,
  Grid
} from '@material-ui/core';
import InvoiceDetailsCard from 'src/components/invoice/InvoiceDetailsCard';
import { useLocation, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import InvoicesService from 'src/services/InvoicesService';

const InvoiceDetails = () => {
  const [invoice, setInvoice] = useState({});
  const { id } = useParams();
  const showAlert = new URLSearchParams(useLocation().search).get("showAlert") || false;
  useEffect(() => {
    loadInvoiceDetails();
  }, []);
  
  const loadInvoiceDetails = () => {
    InvoicesService.loadDetails(id)
      .then(response => {
        setInvoice(response.data);
      }).catch(erro => {
        alert("erro");
        console.log(erro);
      });
  }

  return (
    <>
      <Helmet>
        <title>InvoiceDetails</title>
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
            {showAlert && <Alert severity="success">Your invoice has been sent to the emails provided</Alert> }  
            <InvoiceDetailsCard invoice={invoice} />
            
          </Grid>
        </Container>
      </Box>
    </>
  )
};

export default InvoiceDetails;
