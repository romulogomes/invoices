import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import FindInPage from '@material-ui/icons/FindInPage';


const InvoiceListResults = ({ invoices, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                </TableCell>
                <TableCell>
                  Invoice Number
                </TableCell>
                <TableCell>
                  Company
                </TableCell>
                <TableCell>
                  Data
                </TableCell>
                <TableCell>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.slice(0, limit).map((invoice) => (
                <TableRow
                  hover
                  key={invoice.id}
                >
                  <TableCell>
                    <Link to={`/app/invoice/details/${invoice.id}`}>
                      <FindInPage />
                    </Link>
                  </TableCell>
                  <TableCell>
                    {invoice.phone}
                  </TableCell>
                  <TableCell>
                    {invoice.email}
                  </TableCell>
                  <TableCell>
                    {moment(invoice.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {`${invoice.address.city}, ${invoice.address.state}, ${invoice.address.country}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={invoices.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

InvoiceListResults.propTypes = {
  invoices: PropTypes.array.isRequired
};

export default InvoiceListResults;
