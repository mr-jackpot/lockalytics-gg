import React, { useEffect, useState } from 'react';
import {RatingDisplay} from './RatingDisplay'

interface MatchData {
    kills: number;
    deaths: number;
    assists: number;
    net_worth: number;
    stats: {
        player_damage: number;
        player_healing: number;
        self_healing: number;
        boss_damage: number;
    }[];
}

interface ApiResponse {
    matchData: MatchData;
    rating: number;
}

export default function MostRecentMatchCard() {
    const [data, setData] = useState<ApiResponse | null>(null);

    useEffect(() => {
        fetch('/api/deadlock/match')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error('Error fetching match data:', err));
    }, []);

    if (!data) {
        return <div>Loading match data...</div>;
    }

    const { matchData, rating } = data;
    const stats = matchData.stats[0];
    const teamHealing = stats.player_healing - stats.self_healing;

    return (
        <div
            style={{
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px',
                maxWidth: '400px',
                margin: '1rem auto'
            }}
        >
            <h2>Most Recent Match</h2>
            <p>
                <strong>Kills:</strong> {matchData.kills}
            </p>
            <p>
                <strong>Deaths:</strong> {matchData.deaths}
            </p>
            <p>
                <strong>Assists:</strong> {matchData.assists}
            </p>
            <p>
                <strong>Net Worth:</strong> {matchData.net_worth}
            </p>
            <p>
                <strong>Player Damage:</strong> {stats.player_damage}
            </p>
            <p>
                <strong>Team Healing:</strong> {teamHealing}
            </p>
            <p>
                <strong>Objective Damage:</strong> {stats.boss_damage}
            </p>
            <RatingDisplay rating={rating} />
        </div>
    );
}
