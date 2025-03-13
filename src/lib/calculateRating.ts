// lib/calcRating.ts

interface MatchData {
  kills: number;
  deaths: number;
  assists: number;
  net_worth: number;
  stats: {
    player_damage: number;
    boss_damage: number; // New parameter: objective damage
    player_healing: number;
    self_healing: number;
  }[];
}

/**
 * Calculates a rating for a match.
 * - Average performance yields a rating of 1.0.
 * - Really strong performance is ~1.5.
 * - A complete stomp is ~2.0.
 */
export function calculateRating(matchData: MatchData): number {
  const stats = matchData.stats;
  const teamHealing = stats.player_healing - stats.self_healing;

  // Normalize each metric relative to its average.
  // For kills+assists, average total is 12.
  const combinedKA = matchData.kills + matchData.assists;
  const kaFactor = (combinedKA - 12) / 12;

  // For deaths, lower is better. Average deaths = 10.
  const deathFactor = (10 - matchData.deaths) / 10;

  // For player damage, average = 30,000.
  const damageFactor = (stats.player_damage - 30000) / 30000;

  // For objective damage, average = 8,000.
  const objectiveFactor = (stats.boss_damage - 8000) / 8000;

  // For healing, average (team healing) = 1,000.
  // Cap the healing factor to prevent extremely high healing from dominating.
  const rawHealingFactor = (teamHealing - 1000) / 1000;
  const healingFactor = Math.min(rawHealingFactor, 2);

  // For net worth, average = 37,500.
  const netWorthFactor = (matchData.net_worth - 37500) / 37500;

  // Weights for each normalized factor.
  const weights = {
    ka: 0.5, // kills + assists
    death: 0.25, // deaths
    damage: 0.2, // player damage
    objective: 0.15, // objective (boss) damage
    healing: 0.05, // healing (capped)
    netWorth: 0.1, // net worth
  };

  const weightedSum =
    weights.ka * kaFactor +
    weights.death * deathFactor +
    weights.damage * damageFactor +
    weights.objective * objectiveFactor +
    weights.healing * healingFactor +
    weights.netWorth * netWorthFactor;

  // Scale the weighted sum so that:
  // - Average (weightedSum = 0) → rating = 1.0
  // - A strong performance (weightedSum ~1) → rating ~1.6
  // - A complete stomp (weightedSum ~2) → rating ~2.2
  // Adjust the scale so that average is 1.0, strong ~1.5, stomp ~2.0.
  const scale = 0.6;
  const rating = 1.0 + scale * weightedSum;
  return rating;
}
