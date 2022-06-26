import { getGoalHistory } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import { GoalHistory } from '@/pages/goals/[id]';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<GoalHistory>) {
  const { id } = req.query;
  if (process.env.USE_SQL === 'true') {
    try {
      let row = await getGoalHistory(parseInt(id as string, 10))
      let history: GoalHistory = JSON.parse(row.values)
      res.status(200).json(history);
    } catch (error) {
      apiError(error, res)
    }
  }else{
      res.status(404);
  }
}
