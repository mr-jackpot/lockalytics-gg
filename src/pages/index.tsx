// pages/index.tsx
import { useEffect, useState } from 'react';

interface User {
    displayName: string;
    photos?: { value: string }[];
}

export default function Home() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetch('/api/auth/session')
            .then((res) => res.json())
            .then((data) => {
                if (data.user) {
                    setUser(data.user);
                }
            });
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>Welcome to Lockalytics</h1>
            {user ? (
                <div>
                    <p>Logged in as: {user.displayName}</p>
                    {user.photos && user.photos[0] && (
                        <img
                            src={user.photos[0].value}
                            alt="User Avatar"
                            style={{ borderRadius: '50%', width: '80px', height: '80px' }}
                        />
                    )}
                    <br />
                    <a
                        href="/api/auth/logout"
                        style={{ fontSize: '1.2rem', color: '#0070f3', textDecoration: 'underline' }}
                    >
                        Logout
                    </a>
                </div>
            ) : (
                <a
                    href="/api/auth/steam"
                    style={{ fontSize: '1.2rem', color: '#0070f3', textDecoration: 'underline' }}
                >
                    Sign in with Steam
                </a>
            )}
        </div>
    );
}
