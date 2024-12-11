import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, deleteProductAsync } from '../features/productSlice';
import { getProducts } from '../services/productService';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from '@mui/material';

const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products.products);

    // Ambil data produk saat komponen pertama kali dirender
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts();
            dispatch(setProducts(response));
        };
        fetchProducts();
    }, [dispatch]);

    // Fungsi untuk menghapus produk
    const handleDelete = async (id) => {
        try {
            await dispatch(deleteProductAsync(id)).unwrap();
            console.log(`Product ${id} deleted successfully`);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Fungsi untuk mengedit produk
    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    // Fungsi untuk menambahkan produk baru
    const handleAddProduct = () => {
        navigate('/create');
    };

    // Fungsi Logout
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Product List
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleAddProduct}>
                    Add Product
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Description</strong></TableCell>
                            <TableCell><strong>Price</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        sx={{ mr: 1 }}
                                        onClick={() => handleEdit(product.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ProductList;
