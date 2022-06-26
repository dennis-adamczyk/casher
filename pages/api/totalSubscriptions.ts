// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { SubscriptionData } from '../subscriptions';
const fs = require('fs').promises;

export type monthlySubscriptionsData = {
  monthlySubscriptions: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<monthlySubscriptionsData>) {
  const file = await fs.readFile('./data/subscriptions.json');
  let subscriptions: SubscriptionData[] = JSON.parse(file);

  const monthlySubscriptions = subscriptions.reduce((total, current) => total + current.amount, 0);
  res.status(200).json({ monthlySubscriptions });
}
