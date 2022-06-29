import { apiError } from '@/helpers/api-error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CategoryData, SubscriptionData } from '../subscriptions';

export default async function handler(req: NextApiRequest, res: NextApiResponse<[SubscriptionData, CategoryData][]>) {
  try {
    let subscriptions = await DBClient.subscription.findMany()
    res.status(200).json(subscriptions)
  } catch (error) {
    apiError(error, res)
  }
}
