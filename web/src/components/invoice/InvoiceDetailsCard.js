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



const InvoiceDetailsCard = (props) => {
  const { invoice, showAlert } = props;

  return (
    <Card {...props}>
      <CardContent>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          Invoice Details
        </Typography>
        <Typography
          variant="h5"
        >
          created by {invoice.owner_email} at {moment(invoice.created_at).format('DD/MM/YYYY')}
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
              <h3>{moment(invoice.date).format('DD/MM/YYYY')}</h3>
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
          {showAlert ? 'Your invoice has been sent to the emails provided' : ''}
        </Button>
      </CardActions>
    </Card>
  );
}

export default InvoiceDetailsCard;
