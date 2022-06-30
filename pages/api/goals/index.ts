import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/apiErrorHandler';
import { Goal } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Goal[]>) {
  try {
    if (req.method == 'GET') {
      const goals = await DBClient.goal.findMany();
      res.status(200).json(goals);
    } else if (req.method == 'POST') {
      const newGoal = JSON.parse(req.body) as Goal;
      console.log(
        await DBClient.goal.create({
          data: newGoal
        }),
      );
      console.log(newGoal);
      res.status(200).json([]);
    }
  } catch (error) {
    apiError(error, res);
  }
}
