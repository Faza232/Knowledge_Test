import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div>
            <h1>Welcome, {user?.name || 'Guest'}!</h1>
        </div>
    );
};

export default Dashboard;
