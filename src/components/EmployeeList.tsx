import React, { useEffect, useState } from 'react';
import { api, type Employee } from '../api/mockApi';
import { useAppContext } from '../context/AppContext';
import styles from '../styles/EmployeeList.module.css';

const PAGE_SIZE = 3;

export const EmployeeList = () => {
    const { state } = useAppContext();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!state.currentCompany) return;
        setLoading(true);
        api.getEmployees(state.currentCompany.id, page, PAGE_SIZE).then(({ data, total }) => {
            setEmployees(data);
            setTotal(total);
            setLoading(false);
        });
    }, [state.currentCompany, page]);

    if (!state.currentCompany) return <div>Please select a company.</div>;

    if (loading) return <div>Loading employees...</div>;

    const totalPages = Math.ceil(total / PAGE_SIZE);

    return (
        <div className={styles.container}>
            <h2>Employees</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(e => (
                        <tr key={e.id}>
                            <td>{e.name}</td>
                            <td>{e.department}</td>
                            <td>{e.designation}</td>
                            <td>{e.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.pagination}>
                <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
                    Prev
                </button>
                <span>
                    Page {page} / {totalPages}
                </span>
                <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};