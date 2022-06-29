import { getIntervalMonthlyFactor } from '@/constants/interval';
import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
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
}
