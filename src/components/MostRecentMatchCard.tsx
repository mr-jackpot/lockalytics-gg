import React, { useEffect, useState } from "react";
import { RatingDisplay } from "./RatingDisplay";

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
    fetch("/api/deadlock/match")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching match data:", err));
  }, []);

  if (!data) {
    return <div>Loading match data...</div>;
  }

  const { matchData, rating } = data;
  const stats = matchData.stats[0];
  const teamHealing = stats.player_healing - stats.self_healing;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Most Recent Match
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-semibold">Kills:</span> {matchData.kills}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Deaths:</span> {matchData.deaths}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Assists:</span> {matchData.assists}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Net Worth:</span>{" "}
            {matchData.net_worth}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-semibold">Player Damage:</span>{" "}
            {stats.player_damage}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Objective Damage:</span>{" "}
            {stats.boss_damage}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Team Healing:</span> {teamHealing}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <RatingDisplay rating={rating} />
      </div>
    </div>
  );
}
