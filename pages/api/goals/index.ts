import { DBClient } from '@/data/database';
import { apiError, SuccessResponse } from '@/helpers/apiErrorHandler';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Goal } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Goal[] | SuccessResponse>,
) {
  try {
    if (req.method == 'GET') {
      const goals = await DBClient.goal.findMany();
      res.status(200).json(goals);
    } else if (req.method == 'POST') {
      const newGoal = JSON.parse(req.body) as Goal;
      console.log(
        await DBClient.goal.create({
          data: newGoal,
        }),
      );
      console.log(newGoal);
      res.status(200).json({ success: true });
    }
  } catch (error) {
    apiError(error, res);
  }
});
