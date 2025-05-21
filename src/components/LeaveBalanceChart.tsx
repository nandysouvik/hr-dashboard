import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { api, type LeaveBalance } from '../api/mockApi';
import { useAppContext } from '../context/AppContext';
import styles from '../styles/LeaveBalanceChart.module.css';

const COLORS = ['#0088FE', '#FF8042'];

export const LeaveBalanceChart = () => {
    const { state } = useAppContext();
    const [data, setData] = useState<{ name: string; value: number }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!state.currentCompany) return;
        setLoading(true);
        api.getLeaveBalance(state.currentCompany.id).then(lb => {
            setData([
                { name: 'Used', value: lb.used },
                { name: 'Available', value: lb.available },
            ]);
            setLoading(false);
        });
    }, [state.currentCompany]);

    if (!state.currentCompany) return <div>Please select a company.</div>;

    if (loading) return <div>Loading leave balance...</div>;

    return (
        <div className={styles.container}>
            <h2>Leave Balance</h2>
            <PieChart width={300} height={250}>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};