export const urls = {
  matchHistory: (steamId3: number) =>
    `https://api.deadlock-api.com/v1/players/${steamId3}/match-history`,
  matchDetails: (matchNumber: number) =>
    `https://api.deadlock-api.com/v1/matches/${matchNumber}/metadata`,
};
