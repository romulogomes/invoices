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
import MultipleValueTextInput from 'react-multivalue-text-input';
import { handleErrorApi } from 'src/services/Config';

const NewInvoiceForm = (props) => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState([]);
  const [values, setValues] = useState({
    numberInvoice: '',
    date: '2021-10-05',
    company: '',
    billingFor: '',
    total: '',
    emails: []
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleNewEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (re.test(email)){
      setEmails([...emails, email])
    } else {
      alert("invalid email, fix");
    }
  }

  const saveInvoice = (e) => {
    e.preventDefault();
    InvoicesService.save(values, emails)
      .then(response => {
        const { id } = response.data;
        navigate(`/app/invoice/details/${id}?showAlert=true`, { replace: true });
      }).catch(erro => {
        handleErrorApi(erro);
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
                label="Total"
                name="total"
                type="number"
                onChange={handleChange}
                required
                value={values.total}
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
                label="Company"
                name="company"
                type="textarea"
                onChange={handleChange}
                value={values.company}
                variant="outlined"
                required
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
                required
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <MultipleValueTextInput
	              onItemAdded={(item, allItems) => handleNewEmail(item) }
	              onItemDeleted={(item, allItems) => console.log(`Item removed: ${item}`)}
	              label="Emails"
	              name="item-input"
	              placeholder="Enter whatever items you want; separate them with COMMA or ENTER."
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

export default NewInvoiceForm;
