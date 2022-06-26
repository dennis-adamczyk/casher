import { getIntervalMonthlyFactor } from '@/constants/interval';
import { getGoalsForBankAccount, getSubscriptionsForBankAccount } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs').promises;

export default async function handler(req: NextApiRequest, res: NextApiResponse<number>) {
  const { id } = req.query;
  if (process.env.USE_SQL === 'true') {
    try {
      let bankAccountId = parseInt(id as string, 10)
      let rows = await getSubscriptionsForBankAccount(bankAccountId)
      const totalSubscriptions = rows.reduce((total, current) => total + current.amount * getIntervalMonthlyFactor(current.interval), 0);
      res.status(200).json(totalSubscriptions);   
    } catch (error) {
      apiError(error, res)
    }
  }else{
    res.status(404);
  }
}
