import type { NextApiRequest, NextApiResponse } from 'next';
import { calculateRating } from '../../../lib/calculateRating';
import matchMock from '../../../mocks/33785479_mr_jackpot_stats.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Use the private rating calculation
    const rating = calculateRating(matchMock);
    res.status(200).json({ matchData: matchMock, rating });
}
