import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import InvoiceDetailsCard from 'src/components/invoice/InvoiceDetailsCard';
import { useParams } from 'react-router';

const InvoiceDetails = () => {
  const { id } = useParams();
  console.log(id);

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
            <InvoiceDetailsCard />
          </Grid>
        </Container>
      </Box>
    </>
  )
};

export default InvoiceDetails;
