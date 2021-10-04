import { Navigate, useLocation } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import NewInvoice from './pages/NewInvoice';
import Invoices from './pages/Invoices';
import InvoiceDetails from './pages/InvoiceDetails';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const routes = (isLoggedIn) => {
  const location = useLocation();
  const pageInvoiceDetails = () => location.pathname.split("/")[3] == 'details';
  
  return (
    [
      {
        path: 'app',
        element: isLoggedIn || pageInvoiceDetails() ? <DashboardLayout isLoggedIn={isLoggedIn} /> : <Navigate to="/login" /> ,
        children: [
          { path: 'invoices', element: <Invoices /> },
          { path: 'invoice/new', element: <NewInvoice /> },
          { path: 'invoice/details/:id', element: <InvoiceDetails isLoggedIn={isLoggedIn} /> },
          { path: '*', element: <Navigate to="/404" /> }
        ]
      },
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: '404', element: <NotFound /> },
          { path: '/', element: <Navigate to="/login" /> },
          { path: '*', element: <Navigate to="/login" /> },
        ]
      }
    ]
  );
}
export default routes;
