import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/apiErrorHandler';
import { Subscription } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Subscription|null>) {
  try {
    if (req.method == 'GET') {
        res.status(403).json(null)
    } else if (req.method == 'POST') {
      const newSubscription = JSON.parse(req.body) as Subscription;
      console.log(newSubscription);
      
      console.log(
        await DBClient.subscription.create({
          data: newSubscription
        }),
      );
      console.log(newSubscription);
      res.status(200).json(newSubscription);
    }
  } catch (error) {
    apiError(error, res);
  }
}
