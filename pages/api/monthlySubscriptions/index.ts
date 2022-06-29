import { getIntervalMonthlyFactor } from '@/constants/interval';
import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<number>) {
  try {
    const subs = await DBClient.subscription.findMany();
    const totalMonthlySubCost = subs.reduce(
      (prev, current) => prev + current.amount * getIntervalMonthlyFactor(current.interval),
      0,
    );
    res.status(200).json(totalMonthlySubCost);
  } catch (error) {
    apiError(error, res);
  }
}
