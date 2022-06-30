import { getIntervalMonthlyFactor } from '@/helpers/interval';
import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/apiErrorHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ bankAccountId: string; totalMonthlySubscriptions: number }>,
) {
  const { id } = req.query;
  let bid = id as string;

  try {
    const goals = await DBClient.subscription.findMany({ where: { bank_account_id: bid } });
    const totalMonthlySubCost = goals.reduce(
      (prev, sub) => prev + sub.amount * getIntervalMonthlyFactor(sub.interval),
      0,
    );
    res.status(200).json({ bankAccountId: bid, totalMonthlySubscriptions: totalMonthlySubCost });
  } catch (error) {
    apiError(error, res);
  }
});
