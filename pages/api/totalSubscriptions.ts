// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getIntervalMonthlyFactor } from '@/constants/interval';
import { getSubscriptions, SubscriptionSQLData } from '@/data/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import { SubscriptionData } from '../subscriptions';
const fs = require('fs').promises;


export default async function handler(req: NextApiRequest, res: NextApiResponse<number>) {
  if (process.env.USE_SQL === 'true') {
    getSubscriptions()
      .then((rows: SubscriptionSQLData[]) => {
        let total = 0
        rows.forEach((row)=>{
          total += row.amount * getIntervalMonthlyFactor(row.interval);
        })
        res.status(200).json(total);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  }
  else{
    const file = await fs.readFile('./data/subscriptions.json');
    let subscriptions: SubscriptionData[] = JSON.parse(file);
  
    const monthlySubscriptions = subscriptions.reduce((total, current) => total + current.amount, 0);
    res.status(200).json(monthlySubscriptions);
  }
  
}
