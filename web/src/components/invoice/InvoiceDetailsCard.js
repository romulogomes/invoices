import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';

const invoice = {
  number: '12345',
  date: '2021-09-09',
  company: 'USA',
  bill_to: 'Fred',
  total: '100',
  emails: 'email@example.com'
};

const InvoiceDetailsCard = (props) => (
  <Card {...props}>
    <CardContent>
      <Typography
        color="textPrimary"
        gutterBottom
        variant="h3"
      >
        Invoice Details
      </Typography>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Grid container spacing={5} padding={4}>
          <Grid item xs={6}>
            <h3>Invoice Number</h3>
          </Grid>
          <Grid item xs={6}>
            <h3>{invoice.number}</h3>
          </Grid>
          <Grid item xs={6}>
            <h3>Company</h3>
          </Grid>
          <Grid item xs={6}>
            <h3>{invoice.company}</h3>
          </Grid>
          <Grid item xs={6}>
            <h3>Date</h3>
          </Grid>
          <Grid item xs={6}>
            <h3>{invoice.date}</h3>
          </Grid>
          <Grid item xs={6}>
            <h3>Bill to</h3>
          </Grid>
          <Grid item xs={6}>
            <h3>{invoice.bill_to}</h3>
          </Grid>
          <Grid item xs={6}>
            <h3>Total</h3>
          </Grid>
          <Grid item xs={6}>
            <h3>{invoice.total}</h3>
          </Grid>
          <Grid item xs={6}>
            <h3>Emails</h3>
          </Grid>
          <Grid item xs={6}>
            <h3>{invoice.emails}</h3>
          </Grid>
        </Grid>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Usuário Logado?
      </Button>
    </CardActions>
  </Card>
);

export default InvoiceDetailsCard;
