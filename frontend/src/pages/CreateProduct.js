import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/productService';
import { addProduct } from '../features/productSlice';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
} from '@mui/material';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            name: name.trim(), // Menghapus spasi berlebih
            description: description.trim(),
            price: parseFloat(price), // Konversi ke angka
        };

        console.log('Payload:', newProduct);

        try {
            const response = await createProduct(newProduct);
            dispatch(addProduct(response)); // Tambahkan ke Redux store
            navigate('/products'); // Navigasi kembali ke halaman daftar produk
        } catch (error) {
            console.error('Error creating product:', error.response?.data || error.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Create New Product
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Name"
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Description"
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            multiline
                            rows={3}
                            required
                        />
                        <TextField
                            label="Price"
                            type="number"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            fullWidth
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Create Product
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default CreateProduct;
