import React, { useEffect, useState } from 'react';
import { api, type Company } from '../api/mockApi';
import { useAppContext } from '../context/AppContext';
import styles from '../styles/CompanySwitcher.module.css';

export const CompanySwitcher = () => {
    const { state, dispatch } = useAppContext();
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getCompanies().then(data => {
            setCompanies(data);
            if (!state.currentCompany && data.length > 0) {
                dispatch({ type: 'SET_COMPANY', payload: data[0] });
            }
            setLoading(false);
        });
    }, [dispatch, state.currentCompany]);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = companies.find(c => c.id === e.target.value);
        if (selected) {
            dispatch({ type: 'SET_COMPANY', payload: selected });
        }
    };

    if (loading) return <div>Loading companies...</div>;

    return (
        <select value={state.currentCompany?.id || ''} onChange={onChange} className={styles.select}>
            {companies.map(c => (
                <option key={c.id} value={c.id}>
                    {c.name}
                </option>
            ))}
        </select>
    );
};