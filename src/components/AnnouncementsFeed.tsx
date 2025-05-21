import React, { useEffect, useState } from 'react';
import { api, type Announcement } from '../api/mockApi';
import { useAppContext } from '../context/AppContext';
import styles from '../styles/AnnouncementsFeed.module.css';

export const AnnouncementsFeed = () => {
    const { state } = useAppContext();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!state.currentCompany) return;
        setLoading(true);
        api.getAnnouncements(state.currentCompany.id).then(data => {
            setAnnouncements(data);
            setLoading(false);
        });
    }, [state.currentCompany]);

    if (!state.currentCompany) return <div>Please select a company.</div>;

    if (loading) return <div>Loading announcements...</div>;

    return (
        <div className={styles.container}>
            <h2>Announcements</h2>
            {announcements.length === 0 ? (
                <p>No announcements available.</p>
            ) : (
                announcements.map(a => (
                    <div key={a.id} className={styles.announcement}>
                        <p>
                            <strong>{a.author}</strong> - {new Date(a.timestamp).toLocaleString()}
                        </p>
                        <p>{a.content}</p>
                    </div>
                ))
            )}
        </div>
    );
};