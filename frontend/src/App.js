import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Mengambil token dari Redux
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';

const App = () => {
    const token = useSelector((state) => state.auth.token);  // Ambil token dari Redux state

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    {/* Halaman Login dan Register bisa diakses tanpa autentikasi */}
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Halaman Dashboard dan CRUD Produk hanya bisa diakses setelah login */}
                    <Route
                        path="/dashboard"
                        element={token ? <Dashboard /> : <Navigate to="/" />} // Cek token
                    />
                    <Route
                        path="/products"
                        element={token ? <ProductList /> : <Navigate to="/" />} // Cek token
                    />
                    <Route
                        path="/create"
                        element={token ? <CreateProduct /> : <Navigate to="/" />} // Cek token
                    />
                    <Route
                        path="/edit/:productId"
                        element={token ? <EditProduct /> : <Navigate to="/" />} // Cek token
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
