// pages/profile.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MostRecentMatchCard from '../components/MostRecentMatchCard';

interface User {
    displayName: string;
    photos?: { value: string }[];
}

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch session data with credentials
        fetch('/api/auth/session', { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => {
                if (data.user) {
                    setUser(data.user);
                } else {
                    router.push('/');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Session fetch error:', err);
                router.push('/');
                setLoading(false);
            });
    }, [router]);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
    }

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            {user ? (
                <>
                    <h1>{user.displayName}&apos;s Profile</h1>
                    {user.photos && user.photos[0] && (
                        <img
                            src={user.photos[0].value}
                            alt="User Avatar"
                            style={{ borderRadius: '50%', width: '150px', height: '150px' }}
                        />
                    )}
                    <MostRecentMatchCard />
                    <br />
                    <a
                        href="/api/auth/logout"
                        style={{ fontSize: '1.2rem', color: '#0070f3', textDecoration: 'underline' }}
                    >
                        Logout
                    </a>
                </>
            ) : (
                <div>Redirecting...</div>
            )}
        </div>
    );
}
