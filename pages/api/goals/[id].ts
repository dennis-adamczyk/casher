import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import { Goal } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs').promises;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Goal>) {
  const { id } = req.query;
  const goal_id = id as string

  try {
    const goal = await DBClient.goal.findFirst({where:{id: goal_id}, include:{analysis_data: true, history: true}})
    if(goal){
      res.status(200).json(goal)
    }else{
      res.status(204).json({} as Goal)
    }
  } catch (error) {
    apiError(error, res)
  }
}
