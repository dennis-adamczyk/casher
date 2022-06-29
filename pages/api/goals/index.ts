import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/apiErrorHandler';
import { Goal } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs').promises;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Goal[] | { yeet: string }>) {
  try {
    if (req.method == 'GET') {
      const goals = await DBClient.goal.findMany();
      res.status(200).json(goals);
    } else if (req.method == 'POST') {
      res.status(999).json({ yeet: 'yote' });
    }
  } catch (error) {
    apiError(error, res);
  }
}
