import './App.css';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppProvider from './hoc/AppProvider';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';

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
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
