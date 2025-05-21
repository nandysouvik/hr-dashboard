import React from 'react';
import { CompanySwitcher } from '../components/CompanySwitcher';
import { EmployeeList } from '../components/EmployeeList';
import { LeaveBalanceChart } from '../components/LeaveBalanceChart';
import { AnnouncementsFeed } from '../components/AnnouncementsFeed';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Layout.module.css';

export const Dashboard = () => {
    const { userRole, logout } = useAuth();

    return (
        <div className={styles.container}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>HR Dashboard</h1>
                <div>
                    <span style={{ marginRight: 10 }}>Role: {userRole}</span>
                    <button onClick={logout}>Logout</button>
                </div>
            </header>

            <div style={{ margin: '20px 0' }}>
                <CompanySwitcher />
            </div>

            <div style={{ display: 'flex', gap: 40 }}>
                <div style={{ flex: 3 }}>
                    <EmployeeList />
                </div>
                <div style={{ flex: 2 }}>
                    <LeaveBalanceChart />
                    <AnnouncementsFeed />
                </div>
            </div>
        </div>
    );
};