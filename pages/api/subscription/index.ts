import { DBClient } from '@/data/database';
import { apiError, SuccessResponse } from '@/helpers/apiErrorHandler';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Subscription } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Subscription | SuccessResponse>,
) {
  try {
    if (req.method == 'GET') {
      res.status(403).json({ success: false });
    } else if (req.method == 'POST') {
      const newSubscription = JSON.parse(req.body) as Subscription;
      console.log(newSubscription);

      console.log(
        await DBClient.subscription.create({
          data: newSubscription,
        }),
      );
      console.log(newSubscription);
      res.status(200).json({ success: true });
    }
  } catch (error) {
    apiError(error, res);
  }
});
