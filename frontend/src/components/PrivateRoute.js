import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Mengambil token dari Redux

const PrivateRoute = ({ element, ...rest }) => {
    const token = useSelector((state) => state.auth.token);  // Mengambil token dari Redux state

    // Jika token ada, tampilkan halaman, jika tidak, alihkan ke halaman login
    return (
        <Route 
            {...rest} 
            element={token ? element : <Navigate to="/login" />} // Gunakan Navigate untuk redirect
        />
    );
};

export default PrivateRoute;
