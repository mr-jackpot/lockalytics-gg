import { NextResponse } from "next/server";
import { calculateRating } from "@/lib/calculateRating";
import matchMock from "../../../../mocks/33785479_mr_jackpot_stats.json";

export async function GET() {
  const rating = calculateRating(matchMock);
  return NextResponse.json({ matchData: matchMock, rating });
}
