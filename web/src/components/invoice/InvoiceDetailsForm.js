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
import { useState } from 'react';
import MultipleValueTextInput from 'react-multivalue-text-input';
import { handleErrorApi } from 'src/services/Config';
import InvoicesService from 'src/services/InvoicesService';



const InvoiceDetialsForm = (props) => {
  const [emails, setEmails] = useState([]);
  const handleNewEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (re.test(email)){
      setEmails([...emails, email])
    } else {
      alert("invalid email, fix");
    }
  }
  const sendInvoice = () => {
    InvoicesService.send(props.id, emails)
      .then(response => {
        alert("invoices sent");
      }).catch(erro => {
        handleErrorApi(erro);
      });
    console.log(props.id, emails)
  }

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Grid 
            container 
            spacing={3} 
          >
            <Grid 
              item 
              xs={2}
            >
              <h3>Emails: </h3>
            </Grid>
            <Grid 
              item 
              xs={8}
            >
              <MultipleValueTextInput
                onItemAdded={(item, allItems) => handleNewEmail(item) }
                onItemDeleted={(item, allItems) => console.log(`Item removed: ${item}`)}
	              name="item-input"
	              placeholder="Enter whatever items you want; separate them with COMMA or ENTER."
              />
            </Grid>
            <Grid 
              item 
              xs={2}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={sendInvoice}
                disabled={emails.length == 0}
              >
              Send Invoice
              </Button>
            </Grid>
            
          </Grid>
        </Box>
      </CardContent>
      <Divider />
      
    </Card>
  );
}

export default InvoiceDetialsForm;
