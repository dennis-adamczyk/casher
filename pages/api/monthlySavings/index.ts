import type { NextApiRequest, NextApiResponse } from 'next';
import { DBClient } from '@/data/database';
import { getIntervalMonthlyFactor } from '@/helpers/interval';
import { apiError } from '@/helpers/apiErrorHandler';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse<number>) {
  try {
    const goals = await DBClient.goal.findMany();
    const totalMonthlyGoalCost = goals.reduce(
      (prev, goal) => prev + goal.savings_amount * getIntervalMonthlyFactor(goal.savings_interval),
      0,
    );
    res.status(200).json(totalMonthlyGoalCost);
  } catch (error) {
    apiError(error, res);
  }
});
