import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/apiErrorHandler';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Category } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category[] | null>,
) {
  try {
    if (req.method == 'GET') {
      let category = await DBClient.category.findMany();
      res.status(200).json(category);
    } else if (req.method == 'POST') {
      const newCategory = JSON.parse(req.body) as Category;
      console.log(
        await DBClient.category.create({
          data: newCategory,
        }),
      );
      console.log(newCategory);
      res.status(200).json([]);
    }
  } catch (error) {
    apiError(error, res);
  }
});
