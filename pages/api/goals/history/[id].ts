import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/apiErrorHandler';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Goal_History } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse<Goal_History>) {
  const { id } = req.query;
  const goal_history_id = id as string;

  try {
    const goal_history = await DBClient.goal_History.findFirst({ where: { id: goal_history_id } });
    if (goal_history) {
      res.status(200).json(goal_history);
    } else {
      res.status(204).json({} as Goal_History);
    }
  } catch (error) {
    apiError(error, res);
  }
});
