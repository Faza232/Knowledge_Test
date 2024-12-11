import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService'; // Service untuk register
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validasi password dan konfirmasi password
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            // Kirim data ke backend untuk register
            const response = await register({ name, email, password, gender });
            console.log('Registration successful:', response);
            navigate('/'); // Redirect ke halaman login setelah sukses registrasi
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed! Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleRegister}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                            required
                        />
                        <FormControl fullWidth required>
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                labelId="gender-label"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value="">Select Gender</MenuItem>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Register
                        </Button>
                    </Box>
                </form>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <a href="/" style={{ textDecoration: 'none', color: '#1976d2' }}>
                            Login Here
                        </a>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
