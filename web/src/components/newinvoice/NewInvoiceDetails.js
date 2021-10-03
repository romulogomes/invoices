import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import InvoicesService from 'src/services/InvoicesService';
import { useNavigate } from 'react-router';

const NewInvoiceDetails = (props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    numberInvoice: '123',
    date: '2021-09-30',
    emails: 'demo@devias.io',
    company: 'Husky',
    billingFor: 'Alabama',
    total: 100
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const saveInvoice = (e) => {
    e.preventDefault();
    InvoicesService.save(values)
      .then(response => {
        const { id } = response.data;
        navigate(`/app/invoice/details/${id}?showAlert=true`, { replace: true });
      }).catch(erro => {
        alert("erro");
        console.log(erro);
      });
  }

  return (
    <form
      autoComplete="off"
      onSubmit={saveInvoice}
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information not can be edited"
          title="New Invoice"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Number Invoice"
                name="numberInvoice"
                type="number"
                onChange={handleChange}
                required
                value={values.numberInvoice}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                onChange={handleChange}
                required
                value={values.date}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Emails"
                helperText="Separate emails with a comma"
                name="emails"
                onChange={handleChange}
                required
                value={values.emails}
                type="email"
                multiple
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Company"
                name="company"
                type="textarea"
                onChange={handleChange}
                value={values.company}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Billing for"
                name="billingFor"
                type="textarea"
                onChange={handleChange}
                value={values.billingFor}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Total"
                name="total"
                type="number"
                onChange={handleChange}
                required
                value={values.total}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Save Invoice
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default NewInvoiceDetails;
