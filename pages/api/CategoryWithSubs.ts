import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/apiErrorHandler';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Category, Subscription } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<(Category & { subscriptions: Subscription[] })[]>,
) {
  try {
    let CatWithSubs = await DBClient.category.findMany({ include: { subscriptions: true } });
    res.status(200).json(CatWithSubs);
  } catch (error) {
    apiError(error, res);
  }
});
