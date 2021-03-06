import { getIntervalMonthlyFactor } from '@/helpers/interval';
import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/apiErrorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ bankAccountId: string; totalMonthlySavings: number }>,
) {
  const { id } = req.query;
  let bid = id as string;

  try {
    const goals = await DBClient.goal.findMany({ where: { bank_account_id: bid } });
    const totalMonthlyGoalCost = goals.reduce(
      (prev, goal) => prev + goal.savings_amount * getIntervalMonthlyFactor(goal.savings_interval),
      0,
    );
    res.status(200).json({ bankAccountId: bid, totalMonthlySavings: totalMonthlyGoalCost });
  } catch (error) {
    apiError(error, res);
  }
});
