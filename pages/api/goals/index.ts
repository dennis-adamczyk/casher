import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import { Goal } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs').promises;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Goal[]>) {
  try {
    const goals = await DBClient.goal.findMany();
    res.status(200).json(goals);
  } catch (error) {
    apiError(error, res);
  }
}
