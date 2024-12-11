import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct, getProductById } from '../services/productService'; // Import services
import { updateProduct as updateProductRedux } from '../features/productSlice';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
} from '@mui/material';

const EditProduct = () => {
    const { productId } = useParams(); // Ambil productId dari URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
    });

    // Ambil data produk berdasarkan productId saat komponen pertama kali dirender
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(productId);
                setProduct(response);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = await updateProduct(productId, product);
            dispatch(updateProductRedux(updatedProduct)); // Update state Redux
            navigate('/products'); // Arahkan kembali ke daftar produk
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Edit Product
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Name"
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Description"
                            type="text"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Price"
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Update Product
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default EditProduct;
