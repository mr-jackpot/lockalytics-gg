export const convertSteamID64ToAccountId = (
  steamID64: string | number,
): number => {
  const base = BigInt("76561197960265728");
  const id64 = BigInt(steamID64);
  const accountId = id64 - base;
  return Number(accountId);
};
