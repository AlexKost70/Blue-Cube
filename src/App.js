import './App.css';
import Header from './components/header/Header';
import ProductsPage from './components/productsPage/ProductsPage';
import NotFoundPage from './components/notFoundPage/NotFoundPage';
import { createTheme, ThemeProvider } from '@mui/material';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppProvider from './components/hoc/AppProvider';
import ProductPage from './components/productPage/ProductPage';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Nunito',
      'sans-serif'
    ].join(','),
},});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/pages/1" replace />
  },
  {
    path: "/pages",
    element: <Navigate to="/pages/1" replace />
  },
  {
    path: "/pages/:page",
    element: <ProductsPage />,
  },
  {
    path: "/item",
    element: <Navigate to="/pages/1" replace />
  },
  {
    path: "/item/:id",
    element: <ProductPage />
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

function App() {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
