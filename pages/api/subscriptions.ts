// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/apiErrorHandler';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Subscription } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse<Subscription[]>) {
  try {
    let subscriptions = await DBClient.subscription.findMany();
    res.status(200).json(subscriptions);
  } catch (error) {
    apiError(error, res);
  }
});
