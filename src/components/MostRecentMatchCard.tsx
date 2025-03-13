import React, { useEffect, useState } from "react";
import { RatingDisplay } from "./RatingDisplay";
import { calculateRating } from "@/lib/calculateRating";
import { secondsToMinutesSeconds } from "@/lib/secondsToGameTime";

export default function MostRecentMatchCard({ steamId64 }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/deadlock/match-history?steamid64=${steamId64}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching match data:", err));
  }, []);

  if (!data) {
    return <div>Loading match data...</div>;
  }

  const { playerData } = data;
  const detailedStats = playerData.stats[playerData.stats.length - 1];
  const teamHealing = detailedStats.player_healing - detailedStats.self_healing;
  const rating = calculateRating({
    kills: playerData.kills,
    deaths: playerData.deaths,
    assists: playerData.assists,
    net_worth: playerData.net_worth,
    stats: detailedStats,
  });
  const gameLength = secondsToMinutesSeconds(detailedStats.time_stamp_s);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Most Recent Match
      </h2>
      <h3 className="text-xs text-gray-500 mb-4">Game time: {gameLength}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-semibold">Kills:</span> {playerData.kills}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Deaths:</span> {playerData.deaths}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Assists:</span> {playerData.assists}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Net Worth:</span>{" "}
            {playerData.net_worth}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-semibold">Player Damage:</span>{" "}
            {detailedStats.player_damage}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Objective Damage:</span>{" "}
            {detailedStats.boss_damage}
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
