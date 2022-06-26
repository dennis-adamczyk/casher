// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getIntervalMonthlyFactor } from '@/constants/interval';
import { getSubscriptions, SubscriptionSQLData } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { SubscriptionData } from '../../subscriptions';
const fs = require('fs').promises;


export default async function handler(req: NextApiRequest, res: NextApiResponse<number>) {
  if (process.env.USE_SQL === 'true') {
    try {
      let rows = await getSubscriptions();
      const totalSubscriptions = rows.reduce((total, current) => total + current.amount * getIntervalMonthlyFactor(current.interval), 0);
    res.status(200).json(totalSubscriptions);
    } catch (error) {
      apiError(error, res)
    }
  }
  else{
    const file = await fs.readFile('./data/subscriptions.json');
    let subscriptions: SubscriptionData[] = JSON.parse(file);
  
    const monthlySubscriptions = subscriptions.reduce((total, current) => total + current.amount, 0);
    res.status(200).json(monthlySubscriptions);
  }
  
}
