import { NextRequest, NextResponse } from "next/server";
import { convertSteamID64ToAccountId } from "@/lib/convertSteamID64ToAccountId";
import { urls } from "@/lib/urls";

export async function GET(req: NextRequest) {
  const steamId64 = req.nextUrl.searchParams.get("steamid64");
  if (!steamId64) {
    return NextResponse.json(null);
  }
  const steamId3 = convertSteamID64ToAccountId(steamId64);

  try {
    if (!steamId3) {
      new Error(`SteamId ${steamId3} not found`);
    }

    // 1. Call the external match-history endpoint
    const historyUrl = urls.matchHistory(steamId3);
    const historyRes = await fetch(historyUrl);
    if (!historyRes.ok) {
      new Error(`Failed to fetch match history: ${historyRes.statusText}`);
    }
    const historyData = await historyRes.json();
    if (!Array.isArray(historyData) || historyData.length === 0) {
      new Error(`Failed to fetch match history: ${historyRes.json}`);
    }

    const latestMatch = historyData[0];
    const matchId = latestMatch.match_id;

    const metadataUrl = urls.matchDetails(matchId);
    const metadataRes = await fetch(metadataUrl);
    if (!metadataRes.ok) {
      new Error(`Failed to fetch match metadata: ${metadataRes.statusText}`);
    }
    const metadataData = await metadataRes.json();
    if (!metadataData || metadataData.length === 0) {
      new Error(`Failed to fetch match metadata: ${metadataRes.json}`);
    }
    const playerData = metadataData.match_info.players.find(
      (player) => player.account_id === steamId3,
    );

    return NextResponse.json({
      playerData,
    });
  } catch (error) {
    console.error("Error in external API call:", error);
    new Error(error.message);
  }
}
