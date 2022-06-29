import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import { Category } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Category[]>) {
  try {
    let category = await DBClient.category.findMany();
    res.status(200).json(category);
  } catch (error) {
    apiError(error, res);
  }
}
