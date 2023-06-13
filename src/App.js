import './App.css';
import Header from './components/header/Header';
import ProductsPage from './components/productsPage/ProductsPage';
import { createTheme, ThemeProvider } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
    element: <ProductsPage />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
