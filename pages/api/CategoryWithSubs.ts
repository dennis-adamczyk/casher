import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import { Category, Subscription } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<(Category & {subscriptions: Subscription[]})[]>) {
  try {
    let CatWithSubs = await DBClient.category.findMany({include: {subscriptions:true}})
    res.status(200).json(CatWithSubs)
  } catch (error) {
    apiError(error, res)
  }
}
